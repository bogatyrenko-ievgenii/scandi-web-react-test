import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

import * as actions from '../../../redux/actions';
import { testIfInCart } from '../../../utiils/IfInCart';
import OutOfStock from '../../OutOfStock';

import CartImg from './icons/CartImg';

class CatalogueItem extends PureComponent {

    state = {
        showBtn: false,
        amount: 0,
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

    onShowBtn = (shouldShow = 'hide') => {
        if (shouldShow === 'hide') {
            this.setState({ showBtn: false })
        } else if (shouldShow) {
            this.setState({ showBtn: true })
        }
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
        const { product: { inStock, id, gallery, name, brand }, activeCurrency } = this.props;
        const { showBtn, amount } = this.state;

        const show = showBtn ? 'show' : '';
        const disabled = inStock ? '' : 'disabled';

        return <li
            disabled={!!!inStock} onMouseEnter={() => this.onShowBtn(!!inStock)}
            onMouseLeave={() => this.onShowBtn()} className={`Catalogue__item ${disabled}`}
        >
            <Link onClick={() => this.addToStorage(id)} to={`/product?id=${id}`}>
                <img className='Catalogue__image' src={gallery[0]} alt={name} />
                <div className='Catalogue__name'>{brand} {name}</div>
                <div className='Catalogue__price'>{activeCurrency} {amount.toFixed(2)}</div>
                {!inStock && <OutOfStock percent={45} />}
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