import { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
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
import './miniCart.scss';
import arrow from './Icons/arrow.svg';
import cartImg from './Icons/Empty Cart.svg';

class HeaderActions extends PureComponent {

    componentDidMount() {
        this.props.getCountItemsInCart();
        this.props.getTotalCount();
    }

    componentDidUpdate(prevProps) {
        const { cart, getTotalCount, getCountItemsInCart, activeCategory, onShowBagSelect } = this.props;
        if (prevProps.cart !== cart) {
            getCountItemsInCart();
            getTotalCount();
        }
        if (prevProps.activeCategory !== activeCategory) {
            // onShowBagSelect()
        }
    }

    render() {
        const { cart, activeCurrency, priceLoadingStatus, totalCount, onShowBagSelect, onShowCurrencySelect, bagSelect, currencySelect, cartItemsQty } = this.props;

        const pricesLoading = priceLoadingStatus === 'loading' ? <Spinner size={20} /> : null;
        const pricesLoadError = priceLoadingStatus === 'error' ? <ErrorIndicator /> : null;

        let mainClass = 'BagItemBanner';
        let scrollbar = cart.length > 2 ? 'miniCart__activeScrollbar' : 'miniCart__block-pr';

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
                    <div className="miniCart">
                        <div className="miniCart__block-top">
                            <span className='miniCart__title-bold'>My Bag, </span>
                            <span className='miniCart__title-medium'>{cartItemsQty} items</span>
                        </div>
                        <div className={`miniCart__block-middle ${scrollbar}`}>
                            <ul className='miniCart__list'>
                                {cart.map(item => {
                                    return <li key={item.id} className={mainClass}>
                                        <BagItem product={item} mainClass={mainClass} />
                                    </li>
                                })}
                            </ul>
                        </div>
                        <div className="miniCart__block-bottom">
                            <div className="miniCart__totalPrice">
                                <span className='miniCart__totalPrice-title'>Total</span>
                                <span className='miniCart__totalPrice-amount'>{activeCurrency}{totalCount.toFixed(2)}</span>
                            </div>
                            <div className="miniCart__buttons">
                                <Link onClick={onShowBagSelect} to={'/cart'}
                                    className='miniCart__button miniCart__button-white'
                                    type='button'>
                                    view bag
                                </Link>
                                <button
                                    className='miniCart__button miniCart__button-green'
                                    type='button'
                                    onClick={() => alert('this must be "Check out"')}>
                                    check out
                                </button>
                            </div>
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

HeaderActions.propTypes = {
    cart: PropTypes.array.isRequired,
    activeCurrency: PropTypes.string.isRequired,
    priceLoadingStatus: PropTypes.string.isRequired,
    totalCount: PropTypes.number.isRequired,
    onShowBagSelect: PropTypes.func.isRequired,
    onShowCurrencySelect: PropTypes.func.isRequired,
    bagSelect: PropTypes.bool.isRequired,
    currencySelect: PropTypes.bool.isRequired,
    cartItemsQty: PropTypes.number.isRequired,
    getCountItemsInCart: PropTypes.func.isRequired,
    getTotalCount: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, actions)(HeaderActions);