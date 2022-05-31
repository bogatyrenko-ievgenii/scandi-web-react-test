import { PureComponent } from 'react';
import parse from 'html-react-parser'
import { connect } from 'react-redux';
import { addToCart } from '../../../redux/actions';
import { removeFromCart } from '../../../redux/actions';
import Attributes from './Attributes/Attributes';

class ProdDetails extends PureComponent {

    state = {
        amount: '',
        attrQty: 0,
        selectedAttributes: {},
        filled: false,
        activeBtn: false
    }

    componentDidMount() {
        this.getAmount();
        this.getAttributesLength();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activeCurrency.symblo !== this.props.activeCurrency.symbol) {
            this.getAmount();
        }
        if (prevState.filled !== this.state.filled) {
            this.getActiveBtn();
        }
    }

    addToSelectedAttributes = (key, value) => {
        this.setState(({ selectedAttributes }) => ({
            selectedAttributes: { ...selectedAttributes, [key]: value }
        }))
        this.compareLength();
    }

    getActiveBtn = () => {
        if (this.props.inStock) {
            this.setState({ activeBtn: true })
        }
    }

    compareLength = () => {
        const { attrQty, selectedAttributes } = this.state;
        if (attrQty === Object.keys(selectedAttributes).length + 1) {
            this.setState({ filled: true })
        }
    }

    getAttributesLength = () => {
        this.setState({ attrQty: this.props.attr.length })
    }

    getAmount = () => {
        const prices = this.props.prices;
        return prices.forEach((price) => {
            if (price.currency.symbol === this.props.activeCurrency.symbol) {
                this.setState({ amount: price.amount })
            }
        })
    }

    handleClick = () => {
        const { name, addToCart, cart, removeFromCart } = this.props;
        const { selectedAttributes } = this.state;
        const idx = this.testIfInCart(name, selectedAttributes)
        // addToCart({ name: name, items: selectedAttributes, qty: 1 })
        if (!idx) {
            addToCart({ name: name, items: selectedAttributes, qty: 1 })
        } else {
            let newQty = cart.items[idx].qty + 1;
            removeFromCart(idx);
            addToCart({ name: name, items: selectedAttributes, qty: newQty })
        }
        console.log(cart.items);
    }

    testIfInCart = (name, items) => {
        let itemIsInCart = false;
        const arrayOfCart = this.props.cart.items;
        let notYetInCart = JSON.stringify(items);

        arrayOfCart.forEach((cartItem, idx) => {
            if (cartItem.name === name) {
                let inCart = JSON.stringify(cartItem.items);
                if (inCart === notYetInCart) {
                    itemIsInCart = idx;
                }
            }
        })
        return itemIsInCart
    }

    render() {
        const { brand, name, attr, descr, activeCurrency } = this.props;
        const { amount, activeBtn } = this.state;
        const notFound = !(amount || activeCurrency.symbol) ? <div>Not found</div> : null;
        const price = !notFound ? <div className='Pdp__amount'>{activeCurrency.symbol}{amount}</div> : null;

        return (
            <div className='Pdp__details'>
                <h3 className='Pdp__brand'>{brand}</h3>
                <div className='Pdp__name'>{name}</div>
                <ul className='Pdp__attributes'>
                    {attr.map((prop) => {
                        return <Attributes key={prop.id} name={prop.name}
                            items={prop.items} id={prop.id}
                            addToSelected={this.addToSelectedAttributes} />
                    })}
                </ul>
                <div className="Pdp__attrTitle">Price:</div>
                {notFound}
                {price}
                <button type='button' disabled={!activeBtn} onClick={this.handleClick}
                    className={`Pdp__button ${activeBtn && 'activeBtn'}`}>add to card</button>
                <div className='Pdp__descr'>{parse(`${descr}`)}</div>
            </div>
        );
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
        addToCart: (item) => dispatch(addToCart(item)),
        removeFromCart: (idx) => dispatch(removeFromCart(idx))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProdDetails);