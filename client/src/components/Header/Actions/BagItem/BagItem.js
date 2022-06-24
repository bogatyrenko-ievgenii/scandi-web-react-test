import { PureComponent } from "react";
import { connect } from "react-redux";

import * as actions from '../../../../redux/actions';
import { getProductByID } from '../../../../graphql/queries/getProductByID';
import Attributes from "../../../Attributes";
import Spinner from "../../../Spinner";


class BagItem extends PureComponent {
    state = {
        loading: false,
        error: false,
        brand: null,
        name: null,
        image: null,
        attributes: [],
        amount: 0,
        selected: 0,
    }

    componentDidMount() {
        this.getData();
        this.getAmount();
    }

    componentDidUpdate(prevProps) {
        const { activePrice, qty } = this.props.product;

        if (prevProps.product.activePrice !== activePrice
            || prevProps.product.qty !== qty) {
            this.getAmount();
        }
    }

    getData = async () => {
        this.setState({ loading: true })
        await getProductByID(this.props.product.prodId)
            .then(response => {
                const product = response.data.product;
                this.setState({
                    loading: response.loading,
                    brand: product.brand,
                    name: product.name,
                    image: product.gallery[0],
                    attributes: product.attributes,
                })
            }).catch(() => {
                this.setState({ error: 'Product was not founded..', loading: false })
            })
    }

    getAmount = () => {
        const { product } = this.props;
        this.setState({ amount: 0 });
        this.setState({ amount: product.activePrice * product.qty })
    }

    setSelected = (idx) => {
        this.setState({
            selected: idx
        })
    }

    render() {
        const { brand, name, image, attributes, amount, loading, error } = this.state;
        const { activeCurrency, decrQtyCartItem, incrQtyCartItem, product } = this.props;

        const processing = loading ? <Spinner size={100} /> : null;
        const NotFound = error ? <div style={{ margin: '20px' }}>{error}</div> : null;
        const bagItem = !(loading || error) ? true : null;

        return (
            <>
                {processing}
                {NotFound}
                {bagItem &&
                    <li className='BagItem'>
                        <div className="BagItem__wrapper">
                            <div className="BagItem__details">
                                <h3 className="BagItem__brand">{brand}</h3>
                                <div className="BagItem__name">{name}</div>
                                {amount && <div className="BagItem__price">
                                    {activeCurrency}{amount.toFixed(2)}
                                </div>}
                                <ul className="BagItem__attrs">
                                    {attributes.map((attribute, idx) => {
                                        return <Attributes key={idx} name={attribute.name}
                                            items={attribute.items} blockName='BagItem' defaultAttributes={product.items}
                                            addToSelected={() => console.log('addToSelected')}
                                        />
                                    })}
                                </ul>
                            </div>

                            <div className="BagItem__wrapper-inner">
                                <div className="BagItem__counter">
                                    <button id={product.id} className="BagItem__operator BagItem__operator-incr" onClick={() => incrQtyCartItem(product.id)}></button>
                                    {product.qty}
                                    <button id={product.id} className="BagItem__operator BagItem__operator-decr" onClick={() => decrQtyCartItem(product.id)}></button>
                                </div>
                                <img className="BagItem__image" src={image} alt={name} />
                            </div>

                        </div>
                    </li>
                }
            </>)
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.items,
        activeCurrency: state.activeCurrency.symbol
    }
}


export default connect(mapStateToProps, actions)(BagItem);