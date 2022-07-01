import { PureComponent } from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { addToCart } from '../../../redux/actions';
import { removeFromCart } from '../../../redux/actions';
import Attributes from '../../Attributes/Attributes';
import { testIfInCart } from '../../../reusedScripts/IfInCart';
import { nanoid } from '@reduxjs/toolkit';

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

        if (this.props.attr.length === 0) {
            this.getActiveBtn();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activeCurrency.symbol !== this.props.activeCurrency.symbol) {
            this.getAmount();
        }
        if (prevState.filled !== this.state.filled) {
            this.getActiveBtn();
        }
        if (prevState.selectedAttributes !== this.state.selectedAttributes) {
            this.compareLength();
            this.props.showModal();
        }
    }

    addToSelectedAttributes = (key, value) => {
        this.setState({
            selectedAttributes: { ...this.state.selectedAttributes, [key]: value }
        })
    }

    getActiveBtn = () => {
        if (this.props.inStock) {
            this.setState({ activeBtn: true })
        }
    }

    compareLength = () => {
        const { attrQty, selectedAttributes } = this.state;
        const keys = Object.keys(selectedAttributes);

        if (attrQty === keys.length) {
            this.setState({ filled: true })
        }
    }

    getAttributesLength = () => {
        const { attr } = this.props;
        if (attr) {
            this.setState({ attrQty: this.props.attr.length })
        }
    }

    getAmount = () => {
        const prices = this.props.prices;
        return prices.forEach((price) => {
            if (price.currency.symbol === this.props.activeCurrency.symbol) {
                this.setState({ amount: price.amount })
            }
        })
    }

    onHandleClick = () => {
        const { prodId, name, addToCart, cart, removeFromCart } = this.props;
        const { selectedAttributes, amount } = this.state;
        const inCart = this.props.cart.items;
        const id = testIfInCart(name, selectedAttributes, inCart)

        if (!id) {
            addToCart({ id: nanoid(), prodId: prodId, name: name, items: selectedAttributes, qty: 1, activePrice: amount })
        } else {
            const item = cart.items.find(item => item.id === id);
            let newQty = item.qty + 1;
            removeFromCart(id);
            addToCart({ ...item, qty: newQty })
        }
    }

    render() {
        const { brand, name, attr, descr, activeCurrency: { symbol } } = this.props;
        const { amount, activeBtn } = this.state;
        const notFound = !(amount || symbol) ? <div>Not found</div> : null;
        const price = !notFound ? <div className='Pdp__amount'>{symbol}{amount}</div> : null;

        return (
            <div className='Pdp__details'>
                <h3 className='Pdp__brand'>{brand}</h3>
                <div className='Pdp__name'>{name}</div>
                {attr && <ul className='Pdp__attributes'>
                    {attr.map((prop, idx) => {
                        return <Attributes key={idx} name={prop.name}
                            items={prop.items} blockName='Pdp'
                            addToSelected={this.addToSelectedAttributes} />
                    })}
                </ul>}
                <div className="Pdp__attrName">Price:</div>
                {notFound}
                {price}
                <button type='button' disabled={!activeBtn} onClick={this.onHandleClick}
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