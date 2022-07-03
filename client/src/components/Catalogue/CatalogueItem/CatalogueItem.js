import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../../redux/actions';
import { testIfInCart } from '../../../utiils/IfInCart';

import CartImg from './icons/CartImg';
import { nanoid } from '@reduxjs/toolkit';

class CatalogueItem extends PureComponent {

    state = {
        showBtn: false,
        amount: null
    }

    componentDidMount() {
        this.changeCurrency()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeCurrency !== this.props.activeCurrency) {
            this.changeCurrency()
        }
    }

    changeCurrency = () => {
        const { product, activeCurrency } = this.props;
        const { prices } = product;

        prices.forEach((price) => {
            if (price.currency.symbol === activeCurrency) {
                this.setState({ amount: price.amount })
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

    onHandleClick = () => {
        const { product, cart, addToCart, removeFromCart } = this.props;
        const defaultAttrs = this.createDefaultAttrs();
        const id = testIfInCart(product.name, defaultAttrs, cart)

        if (!id) {
            addToCart({
                id: nanoid(),
                prodId: product.id,
                name: product.name,
                items: defaultAttrs,
                qty: 1, activePrice:
                    this.state.amount
            })
        } else {
            const item = cart.find(item => item.id === id);
            let newQty = item.qty + 1;
            removeFromCart(id);
            addToCart({
                ...item, qty: newQty
            })
        }
    }

    createDefaultAttrs = () => {
        const attributes = this.props.product.attributes;
        const defaultAttrs = {};

        if (attributes) {
            attributes.forEach(item => {
                defaultAttrs[item.name] = item.items[0].value
            })
        }
        return defaultAttrs
    }

    render() {
        const { product: { inStock, id, gallery, name, brand, }, activeCurrency } = this.props;
        const { showBtn, amount } = this.state;

        const outOfStock = !inStock;
        const classOutOfStock = outOfStock ? 'disabled' : '';
        const show = showBtn ? 'show' : '';

        return <li
            disabled={!!outOfStock} onMouseEnter={() => this.showBtn(classOutOfStock)}
            onMouseLeave={this.hideBtn} className={`Catalogue__item ${classOutOfStock}`}
        >
            <Link onClick={() => this.addToStorage(id)} to={`/product?id=${id}`}>
                <img className='Catalogue__image' src={gallery[0]} alt={name} />
                <div className='Catalogue__name'>{brand} {name}</div>
                <div className='Catalogue__price'>{activeCurrency} {amount}</div>
                {outOfStock && <div className="Catalogue__outOfStock">out of stock</div>}
            </Link>
            <div onClick={this.onHandleClick} className={`Catalogue__addToCart ${show}`}>
                <CartImg />
            </div>
        </li>
    }
}

function mapStateToProps(state) {
    return {
        activeCurrency: state.activeCurrency.symbol,
        cart: state.cart.items,

    }
}

CatalogueItem.propTypes = {
    product: PropTypes.object.isRequired,
    activeCurrency: PropTypes.string.isRequired,
    addToCart: PropTypes.func.isRequired,
    cart: PropTypes.array.isRequired,
    changeCurrency: PropTypes.func.isRequired,
    changeProdId: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, actions)(CatalogueItem);