import { PureComponent } from 'react';
import CurrenciesItem from './CurrenciesItem';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import BagItem from './BagItem/BagItem';

import './Actions.scss';
import arrow from './Icons/arrow.svg';
import cartImg from './Icons/Empty Cart.svg';

class Actions extends PureComponent {

    state = {
        openSelect: false,
        openBagPreview: false,
        count: null,
    }

    componentDidMount() {
        this.getCountItemsInCart()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cart !== this.props.cart) {
            this.getCountItemsInCart();
        }
    }

    onOpenSelect = () => {
        this.setState(({ openSelect }) => ({
            openSelect: !openSelect
        }))
    }

    getCountItemsInCart = () => {
        this.setState({ count: null })
        const items = this.props.cart.items;
        if (items) {
            items.forEach(item => {
                this.setState(({ count }) => ({ count: count + item.qty }))
            });
        }
    }

    showCart = () => {

    }

    render() {
        const { currentCurrency, currencies, change, cart } = this.props;
        const { openSelect, count } = this.state;

        return (
            <div className='Actions' >
                <div onClick={this.onOpenSelect} className="Actions__currencies">
                    {currentCurrency} <img className='Actions__arrow' src={arrow} alt="v" />
                </div>
                <div onClick={this.showCart} className='Actions__cart'><img className='Actions__image' src={cartImg} alt="cart" />
                    {count && <span className='Actions__qty'>{count}</span>}
                </div>
                {openSelect && <div onClick={this.onOpenSelect} className="backDropCurrency"></div>}
                <ul className='Currencies'>
                    {currencies.map((currency, idx) => {
                        return openSelect
                            ? <CurrenciesItem key={idx} currency={currency}
                                change={change} close={this.onOpenSelect} />
                            : null;
                    })}
                </ul>
                <div className='backDropBag'></div>
                <div className="bagPreview">
                    <div className="bagPreview__title"><span className='bagPreview__title-bold'>My Bag, </span><span className='bagPreview__title-medium'>3 items</span></div>
                    <ul className='bagPreview__list'>
                        {cart.items.map((item, idx) => {
                            return <BagItem key={idx} product={item} currentCurrency={currentCurrency} />
                        })}
                    </ul>
                    <div className="bagPreview__totalPrice"><span className='bagPreview__totalPrice-title'>Total</span><span className='bagPreview__totalPrice-amount'>$200</span></div>
                    <div className="bagPreview__buttons">
                        <button className='bagPreview__button bagPreview__button-white' type='button'>view bag</button>
                        <button className='bagPreview__button bagPreview__button-green' type='button'>check out</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
    }
}

Actions.propTypes = {
    currentCurrency: PropTypes.string.isRequired,
    currencies: PropTypes.array.isRequired,
}


export default connect(mapStateToProps)(Actions);