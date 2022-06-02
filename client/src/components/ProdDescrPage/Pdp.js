import { PureComponent } from 'react';
import { getProductByID } from '../../services/queries/product';
import { connect } from 'react-redux';
import { changeProdId } from '../../redux/actions';
import { changeCategory } from '../../redux/actions'
import Container from '../Container';
import ProdDetails from './ProdDetails'

import './Pdp.scss';

class Pdp extends PureComponent {

    state = {
        error: false,
        loading: false,
        product: {},
        gallery: [],
        activeImage: 0,
        attributes: [],
        prices: [],
        inStock: null,
    }

    componentDidMount() {
        this.getProdToState();
        this.props.changeCategory('');
    }


    getProdToState = async () => {
        this.setState({ loading: true })
        return await getProductByID(this.props.activeProd.id)
            .then(response => {
                this.setState({
                    loading: response.loading,
                    product: response.data.product,
                    gallery: response.data.product.gallery,
                    attributes: response.data.product.attributes,
                    prices: response.data.product.prices,
                    inStock: response.data.product.inStock,
                })
            }).catch(() => {
                this.setState({ error: true })
            })
    }

    switchImage = (idx) => {
        this.setState({ activeImage: idx })
    }

    render() {
        const { error, loading, product, gallery, activeImage, attributes, prices, inStock } = this.state;

        const processing = loading ? 'Loading' : null;
        const notAvailable = error ? 'Error' : null;
        const showProduct = !(loading || error || !product || !gallery) ? true : null;

        return (
            <section className="Pdp">
                <Container>
                    {processing}
                    {notAvailable}
                    {showProduct && <div className="Pdp__wrapper">
                        <ul className="Pdp__list">
                            {gallery.map((item, idx) => {
                                return <li key={idx} onClick={() => this.switchImage(idx)} className='Pdp__item'>
                                    <img className='Pdp__img' src={item} alt={product.name} />
                                </li>
                            })}
                        </ul>
                        <div className="Pdp__chosenImg">
                            <img className='Pdp__img' src={gallery[activeImage]} alt={product.name} />
                        </div>
                        <ProdDetails id={product.id} brand={product.brand} name={product.name}
                            attr={attributes} descr={product.description} prices={prices} inStock={inStock} />
                    </div>
                    }
                </Container>
            </section>

        );
    }
}

function mapStateToProps(state) {
    return {
        activeCurrency: state.activeCurrency,
        activeProd: state.activeProd,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeProdId: (id) => dispatch(changeProdId(id)),
        changeCategory: (name) => dispatch(changeCategory(name))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pdp);