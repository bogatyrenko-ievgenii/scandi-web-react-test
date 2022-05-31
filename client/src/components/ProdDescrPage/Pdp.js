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
        const product = await getProductByID(this.props.activeProd.id)

        if (product) {
            this.setState({
                loading: product.loading,
                product: product.data.product,
                gallery: product.data.product.gallery,
                attributes: product.data.product.attributes,
                prices: product.data.product.prices,
                inStock: product.data.product.inStock,
            })
        } else {
            this.setState({
                error: true
            })
        }
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
                        <ProdDetails brand={product.brand} name={product.name} attr={attributes} descr={product.description} prices={prices} inStock={inStock} />
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