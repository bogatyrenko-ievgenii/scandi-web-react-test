import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../redux/actions';
import { getProductByID } from '../../graphql/queries/getProductByID';
import Container from '../Container';
import Spinner from '../Spinner';
import ErrorIndicator from '../ErrorIndicator';
import ProdDetails from './ProdDetails'
import BackDrops from '../BackDrops';
import Modal from '../Modal';

import './ProductDescrPage.scss';

class ProductDescrPage extends PureComponent {

    state = {
        error: false,
        loading: false,

        prodId: null,
        name: null,
        brand: null,
        description: null,
        gallery: [],
        activeImage: 0,
        attributes: [],
        prices: [],
        inStock: null,
        showModal: false
    }

    componentDidMount() {
        this.getProdToState();
        this.props.changeCategory('');
    }

    getProdToState = async () => {
        this.setState({ loading: true })
        return await getProductByID(this.props.activeProd)
            .then(response => {
                const product = response.data.product;
                this.setState({
                    loading: response.loading,
                    name: product.name,
                    prodId: product.id,
                    brand: product.brand,
                    description: product.description,
                    gallery: product.gallery,
                    attributes: product.attributes,
                    prices: product.prices,
                    inStock: product.inStock,
                })
            }).catch(() => {
                this.setState({ error: true })
            })
    }

    switchImage = (idx) => {
        this.setState({ activeImage: idx })
    }

    onShowModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }

    render() {
        const { error, loading, name, brand, description, prodId, gallery, activeImage, attributes, prices, inStock, showModal } = this.state;

        const processing = loading ? <Spinner size={200} /> : null;
        const notAvailable = error ? <ErrorIndicator /> : null;
        const showProduct = !(loading || error) ? true : null;

        return (
            <main className="Pdp">
                <Container>
                    {processing}
                    {notAvailable}
                    {showProduct && <div className="Pdp__wrapper">
                        <ul className="Pdp__list">
                            {gallery.map((item, idx) => {
                                return <li key={idx} onClick={() => this.switchImage(idx)} className='Pdp__item'>
                                    <img className='Pdp__img' src={item} alt={name} />
                                </li>
                            })}
                        </ul>
                        <div className="Pdp__chosenImg">
                            <img className='Pdp__img' src={gallery[activeImage]} alt={name} />
                        </div>
                        <ProdDetails prodId={prodId} brand={brand} name={name}
                            attr={attributes} descr={description} prices={prices} inStock={inStock} showModal={this.onShowModal} />
                    </div>
                    }
                </Container>
                <BackDrops />
                {!inStock && showModal &&
                    <Modal showModalStatus={showModal} closeModal={this.onShowModal}>
                        <article className='Modal__textWrap'>
                            <div>This product isn't in Stock.</div>
                            <div>Investigatively, it couldn't be added to cart.</div>
                            <div>Try to look for something else...</div>
                        </article>
                    </Modal>}
            </main>

        );
    }
}

function mapStateToProps(state) {
    return {
        activeProd: state.activeProd.id,
    }
}

ProductDescrPage.propTypes = {
    activeProd: PropTypes.string.isRequired,
    changeCategory: PropTypes.func.isRequired
}

export default connect(mapStateToProps, actions)(ProductDescrPage);