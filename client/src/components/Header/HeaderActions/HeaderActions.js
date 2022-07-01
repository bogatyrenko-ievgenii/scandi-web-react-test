import { PureComponent } from 'react';
// import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import BagItem from '../../BagItem';
import Currencies from './Currencies';
import ErrorIndicator from '../../ErrorIndicator';
import Spinner from '../../Spinner';
import * as actions from '../../../redux/actions';

import './HeaderActions.scss';
import './BagItemBanner.scss';
import './Currencies.scss';
import './bagPreview.scss';
import arrow from './Icons/arrow.svg';
import cartImg from './Icons/Empty Cart.svg';

class Actions extends PureComponent {

    // state = {
    //     // currency: null,
    //     // openSelect: false,
    //     // openBagPreview: false,
    //     // count: null,
    //     // cartPrices: []
    // }

    componentDidMount() {
        this.props.getCountItemsInCart();
        this.props.getTotalCount();
    }

    componentDidUpdate(prevProps) {
        const { cart, getTotalCount, getCountItemsInCart } = this.props;
        if (prevProps.cart !== cart) {
            getCountItemsInCart();
            getTotalCount();
        }
        // if (prevProps.activeCategory !== activeCategory && this.state.openBagPreview) {
        //     this.setState({ openBagPreview: false })
        // }
        // if (prevState.openBagPreview !== this.state.openBagPreview) {

        //     if (this.state.openBagPreview) {
        //         // document.body.style.overflow = 'hidden'
        //         // document.querySelector('.Layout').children[1].
        //         // document.querySelector('.Layout').children[1].scrollHeight = '100vh'

        //     } else {
        //         document.body.style.overflow = 'unset'
        //     }
        // }
    }

    // 2 ф-ции перенос в header

    // showSelect = () => {
    //     this.setState(({ openSelect }) => ({
    //         openSelect: !openSelect
    //     }))
    //     if (this.state.openBagPreview) {
    //         this.setState({
    //             openBagPreview: false
    //         })
    //     }
    // }

    // showBagPreview = () => {
    //     this.setState(({ openBagPreview }) => ({
    //         openBagPreview: !openBagPreview
    //     }))
    // }

    // getCountItemsInCart = () => {
    //     const cart = this.props.cart
    //     if (cart.length !== 0) {
    //         let count = cart.reduce((prev, current) => {
    //             return prev + current.qty
    //         }, 0)
    //         this.setState({ count })
    //     }
    // }

    render() {
        const { cart, activeCurrency, priceLoadingStatus, totalCount, onShowBagSelect, onShowCurrencySelect, bagSelect, currencySelect, cartItemsQty } = this.props;

        const pricesLoading = priceLoadingStatus === 'loading' ? <Spinner size={20} /> : null;
        const pricesLoadError = priceLoadingStatus === 'error' ? <ErrorIndicator /> : null;

        let mainClass = 'BagItemBanner'

        return (
            <div className='Actions' >
                <div onClick={onShowCurrencySelect} className="Actions__currencies">
                    {activeCurrency} <img className='Actions__arrow' src={arrow} alt="v" />
                </div>

                {pricesLoading}
                {pricesLoadError}
                {!(pricesLoading || pricesLoadError) &&
                    <div onClick={onShowBagSelect} className='Actions__cart'>
                        <img className='Actions__image' src={cartImg} alt="cart" />
                        {cartItemsQty > 0 && <span className='Actions__qty'>{cartItemsQty}</span>}
                    </div>
                }

                {currencySelect && <Currencies showSelect={onShowCurrencySelect} />}

                {bagSelect &&
                    <div className="bagPreview">
                        <div className="bagPreview__title">
                            <span className='bagPreview__title-bold'>My Bag, </span>
                            <span className='bagPreview__title-medium'>{cartItemsQty} items</span>
                        </div>
                        <ul className='bagPreview__list'>
                            {cart.map(item => {
                                return <li key={item.id} className={mainClass}>
                                    <BagItem product={item} mainClass={mainClass} />
                                </li>
                            })}
                        </ul>
                        <div className="bagPreview__totalPrice">
                            <span className='bagPreview__totalPrice-title'>Total</span>
                            <span className='bagPreview__totalPrice-amount'>{activeCurrency}{totalCount.toFixed(2)}</span>
                        </div>
                        <div className="bagPreview__buttons">
                            <Link onClick={onShowBagSelect} to={'/cart'}
                                className='bagPreview__button bagPreview__button-white'
                                type='button'>
                                view bag
                            </Link>
                            <button
                                className='bagPreview__button bagPreview__button-green'
                                type='button'
                                onClick={() => alert('this must be "Check out"')}>
                                check out
                            </button>
                        </div>
                    </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.items,
        totalCount: state.cart.totalCount,
        cartItemsQty: state.cart.itemsQty,
        priceLoadingStatus: state.cart.loadingStatus,
        activeCategory: state.activeCategory.name,
        activeCurrency: state.activeCurrency.symbol,
        bagSelect: state.customSelects.bagSelect,
        currencySelect: state.customSelects.currencySelect
    }
}

Actions.propTypes = {
    // currentCurrency: PropTypes.string.isRequired,
    // currencies: PropTypes.array.isRequired,
}


export default connect(mapStateToProps, actions)(Actions);