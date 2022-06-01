import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeProdId } from '../../../redux/actions';
import { testIfInCart } from '../../../reusedScripts/IfInCart';
import { addToCart } from '../../../redux/actions';
import { removeFromCart } from '../../../redux/actions';
import { addCartToLS } from '../../../reusedScripts/addCartToLS';

import cartIcon from './../icons/Vector.svg'

class CatalogueItem extends PureComponent {
    state = {
        showBtn: false,
        symbol: '',
        amount: null
    }

    componentDidMount() {
        this.changeCurrency()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeCurrency.symbol !== this.props.symbol) {
            this.changeCurrency()
        }
    }

    changeCurrency = () => {
        const { product, activeCurrency } = this.props;
        const { prices } = product;
        const { symbol } = activeCurrency;
        prices.forEach((price) => {
            if (price.currency.symbol === symbol) {
                this.setState({ symbol: symbol, amount: price.amount })
            }
        })
    }

    addToStorage = (id) => {
        this.props.changeProdId(id);
        this.addProdIDToLS(id)
    }

    addProdIDToLS = (id) => {
        localStorage.setItem('currentProd', id)
    }

    showBtn = (outOfStock) => {
        if (!outOfStock) {
            this.setState({ showBtn: true })
        }
    }

    hideBtn = () => {
        this.setState({ showBtn: false })
    }

    handleClick = () => {
        const { product, cart, addToCart, removeFromCart } = this.props;
        const defaultAttrs = this.createDefaultAttrs();
        const idx = testIfInCart(product.name, defaultAttrs, cart.items)

        if (idx !== 0 && !idx) {
            addToCart({ name: product.name, items: defaultAttrs, qty: 1 })
        } else {
            let newQty = cart.items[idx].qty + 1;
            removeFromCart(idx);
            addToCart({ name: product.name, items: defaultAttrs, qty: newQty })
        }
        addCartToLS();
    }

    createDefaultAttrs = () => {
        const attributes = this.props.product.attributes;
        const defaultAttrs = {};

        if (attributes) {
            attributes.forEach(item => {
                defaultAttrs[`${item.name}`] = item.items[0].value
            })
        }
        return defaultAttrs
    }

    render() {
        const { product } = this.props;
        const { showBtn, symbol, amount } = this.state;

        const outOfStock = !product.inStock;
        const classOutOfStock = outOfStock ? 'disabled' : '';
        const show = showBtn ? 'show' : '';

        return <li
            disabled={outOfStock} onMouseEnter={() => this.showBtn(classOutOfStock)}
            onMouseLeave={this.hideBtn} className={`Catalogue__item ${classOutOfStock}`}
        >
            <Link onClick={() => this.addToStorage(product.id)} to={`/product?id=${product.id}`}>
                <img className='Catalogue__image' src={product.gallery[0]} alt={product.name} />
                <div className='Catalogue__name'>{product.brand} {product.name}</div>
                <div className='Catalogue__price'>{symbol} {amount}</div>
                {outOfStock && <div className="Catalogue__outOfStock">out of stock</div>}
            </Link>
            <div onClick={this.handleClick} className={`Catalogue__addToCart ${show}`}>
                <img className='Catalogue__icon' src={cartIcon} alt="cart" />
            </div>
        </li>
    }
}

function mapStateToProps(state) {
    return {
        activeCurrency: state.activeCurrency,
        activeProd: state.activeProd,
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeProdId: (id) => dispatch(changeProdId(id)),
        addToCart: (item) => dispatch(addToCart(item)),
        removeFromCart: (idx) => dispatch(removeFromCart(idx))
    }
}

CatalogueItem.propTypes = {
    product: PropTypes.object.isRequired,
    activeCurrency: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueItem);