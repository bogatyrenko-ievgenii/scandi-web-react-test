import { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { changeProdId } from '../../redux/actions';
import * as actions from '../../redux/actions'
import { getProductByID } from '../../graphql/queries/getProductByID';

import Container from '../Container';
import ProdDetails from './ProdDetails'

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
    }

    componentDidMount() {
        this.getProdToState();
        this.props.changeCategory('');
    }

    getProdToState = async () => {
        this.setState({ loading: true })
        return await getProductByID(this.props.activeProd.id)
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

    render() {
        const { error, loading, name, brand, description, prodId, gallery, activeImage, attributes, prices, inStock } = this.state;

        const processing = loading ? 'Loading' : null;
        const notAvailable = error ? 'Error' : null;
        const showProduct = !(loading || error) ? true : null;

        return (
            <section className="Pdp">
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
                            attr={attributes} descr={description} prices={prices} inStock={inStock} />
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

// function mapDispatchToProps(dispatch) {
//     return {
//         changeProdId: (id) => dispatch(changeProdId(id)),
//         changeCategory: (name) => dispatch(changeCategory(name))
//     }
// }


export default connect(mapStateToProps, actions)(ProductDescrPage);