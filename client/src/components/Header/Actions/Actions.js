import { PureComponent } from 'react';
import CurrenciesItem from './CurrenciesItem';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

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
        const { current, currencies, change, cart, activeCurrency } = this.props;
        const { openSelect, count } = this.state;
        console.log(cart);
        return (
            <>
                <div className='Actions' >
                    <div onClick={this.onOpenSelect} className="Actions__currencies">
                        {current} <img className='Actions__arrow' src={arrow} alt="v" />
                    </div>
                    <div onClick={this.showCart} className='Actions__cart'><img className='Actions__image' src={cartImg} alt="cart" />
                        {count && <span className='Actions__qty'>{count}</span>}
                    </div>
                </div>
                {openSelect && <div onClick={this.onOpenSelect} className="backDrop"></div>}
                <ul className='Currencies'>
                    {currencies.map((currency, idx) => {
                        return openSelect
                            ? <CurrenciesItem key={idx} currency={currency}
                                change={change} close={this.onOpenSelect} />
                            : null;
                    })}
                </ul>
                <div className='bagPreview'>
                    <ul className='bagPreview__list'>

                    </ul>

                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        activeCurrency: state.activeCurrency
    }
}

Actions.propTypes = {
    current: PropTypes.string.isRequired,
    currencies: PropTypes.array.isRequired,
}
export default connect(mapStateToProps)(Actions);