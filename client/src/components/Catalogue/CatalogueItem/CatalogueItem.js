import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { changeProdId } from '../../../redux/actions';
import { addToCart } from '../../../redux/actions';
import { removeFromCart } from '../../../redux/actions';
import { testIfInCart } from '../../../reusedScripts/IfInCart';

import cartIcon from '../icons/Vector.svg'
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
        if (prevProps.activeCurrency.symbol !== this.props.activeCurrency.symbol) {
            this.changeCurrency()
        }
    }

    changeCurrency = () => {
        const { product, activeCurrency: { symbol } } = this.props;
        const { prices } = product;

        prices.forEach((price) => {
            if (price.currency.symbol === symbol) {
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
        const id = testIfInCart(product.name, defaultAttrs, cart.items)

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
            const item = cart.items.find(item => item.id === id);
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
        const { product: { inStock, id, gallery, name, brand, }, activeCurrency: { symbol } } = this.props;
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
                <div className='Catalogue__price'>{symbol} {amount}</div>
                {outOfStock && <div className="Catalogue__outOfStock">out of stock</div>}
            </Link>
            <div onClick={this.onHandleClick} className={`Catalogue__addToCart ${show}`}>
                <img className='Catalogue__icon' src={cartIcon} alt="cart" />
            </div>
        </li>
    }
}

function mapStateToProps(state) {
    return {
        activeCurrency: state.activeCurrency,
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