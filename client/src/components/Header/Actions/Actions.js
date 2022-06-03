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
        totalCount: 0
    }

    componentDidMount() {
        this.getCountItemsInCart()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cart !== this.props.cart) {
            this.getCountItemsInCart();
        }
        if (prevProps.activeCategory.name !== this.props.activeCategory.name && this.state.openBagPreview) {
            this.setState({ openBagPreview: false })
        }
    }

    showSelect = () => {
        this.setState(({ openSelect }) => ({
            openSelect: !openSelect
        }))
        if (this.state.openBagPreview) {
            this.setState({
                openBagPreview: false
            })
        }
    }

    showBagPreview = () => {
        this.setState(({ openBagPreview }) => ({
            openBagPreview: !openBagPreview
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

    getTotalCount = (amount) => {
        this.setState(({ totalCount }) => ({
            totalCount: totalCount + amount
        }))
    }


    render() {
        const { currentCurrency, currencies, change, cart } = this.props;
        const { openSelect, openBagPreview, count, totalCount } = this.state;

        return (
            <div className='Actions' >
                <div onClick={this.showSelect} className="Actions__currencies">
                    {currentCurrency} <img className='Actions__arrow' src={arrow} alt="v" />
                </div>
                <div onClick={this.showBagPreview} className='Actions__cart'><img className='Actions__image' src={cartImg} alt="cart" />
                    {count && <span className='Actions__qty'>{count}</span>}
                </div>
                {openSelect && <div onClick={this.showSelect} className="backDropCurrency"></div>}
                <ul className='Currencies'>
                    {currencies.map((currency, idx) => {
                        return openSelect
                            ? <CurrenciesItem key={idx} currency={currency}
                                change={change} close={this.showSelect} />
                            : null;
                    })}
                </ul>

                {openBagPreview && <div onClick={this.showBagPreview} className='backDropBag'></div>}
                {openBagPreview && <div className="bagPreview">
                    <div className="bagPreview__title"><span className='bagPreview__title-bold'>My Bag, </span><span className='bagPreview__title-medium'>{count} items</span></div>
                    <ul className='bagPreview__list'>
                        {cart.items.map((item, idx) => {
                            return <BagItem key={idx} product={item} prodFromRedux={cart.items[idx]}
                                currentCurrency={currentCurrency} getTotalCount={this.getTotalCount} />
                        })}
                    </ul>
                    <div className="bagPreview__totalPrice">
                        <span className='bagPreview__totalPrice-title'>Total</span>
                        <span className='bagPreview__totalPrice-amount'>{currentCurrency}{totalCount.toFixed(2)}</span>
                    </div>
                    <div className="bagPreview__buttons">
                        <button className='bagPreview__button bagPreview__button-white' type='button'>view bag</button>
                        <button className='bagPreview__button bagPreview__button-green' type='button'>check out</button>
                    </div>
                </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        activeCategory: state.activeCategory
    }
}

Actions.propTypes = {
    currentCurrency: PropTypes.string.isRequired,
    currencies: PropTypes.array.isRequired,
}


export default connect(mapStateToProps)(Actions);