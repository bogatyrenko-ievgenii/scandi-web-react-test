import { PureComponent } from 'react';
// import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import BagItem from '../../BagItem';
import Currencies from './Currencies';
import ErrorIndicator from '../../ErrorIndicator';
import Spinner from '../../Spinner'

import './Actions.scss';
import arrow from './Icons/arrow.svg';
import cartImg from './Icons/Empty Cart.svg';

class Actions extends PureComponent {

    state = {
        currency: null,
        openSelect: false,
        openBagPreview: false,
        count: null,
        totalCount: 0,
        cartPrices: []
    }

    componentDidMount() {
        this.getCountItemsInCart();
        this.getTotalCount();
    }

    componentDidUpdate(prevProps, prevState) {
        const { cart, activeCategory } = this.props;
        if (prevProps.cart !== cart) {
            this.getCountItemsInCart();
            this.getTotalCount();
        }
        if (prevProps.activeCategory !== activeCategory && this.state.openBagPreview) {
            this.setState({ openBagPreview: false })
        }
        if (prevState.openBagPreview !== this.state.openBagPreview) {
            // handleBackDropShow(this.state.openBagPreview);
            if (this.state.openBagPreview) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'unset'
            }
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
        const cart = this.props.cart
        if (cart.length !== 0) {
            let count = cart.reduce((prev, current) => {
                return prev + current.qty
            }, 0)
            this.setState({ count })
        }

    }

    getTotalCount = () => {
        let count = this.props.cart.reduce((prev, current) => {
            return prev + current.qty * current.activePrice
        }, 0)
        this.setState({ totalCount: count })
    }

    render() {
        const { cart, activeCurrency, priceLoadingStatus } = this.props;
        const { openSelect, openBagPreview, count, totalCount } = this.state;

        const pricesLoading = priceLoadingStatus === 'loading' ? <Spinner size={20} /> : null;
        const pricesLoadError = priceLoadingStatus === 'error' ? <ErrorIndicator /> : null;

        return (
            <div className='Actions' >
                <div onClick={this.showSelect} className="Actions__currencies">
                    {activeCurrency} <img className='Actions__arrow' src={arrow} alt="v" />
                </div>

                {pricesLoading}
                {pricesLoadError}
                {!(pricesLoading || pricesLoadError) &&
                    <div onClick={this.showBagPreview} className='Actions__cart'>
                        <img className='Actions__image' src={cartImg} alt="cart" />
                        {count > 0 && <span className='Actions__qty'>{count}</span>}
                    </div>
                }

                {openSelect && <div onClick={this.showSelect} className="backDropCurrency"></div>}
                {openSelect && <Currencies showSelect={this.showSelect} />}

                {openBagPreview && <div onClick={this.showBagPreview} className='backDropBag'></div>}
                {openBagPreview &&
                    <div className="bagPreview">
                        <div className="bagPreview__title">
                            <span className='bagPreview__title-bold'>My Bag, </span>
                            <span className='bagPreview__title-medium'>{count} items</span>
                        </div>
                        <ul className='bagPreview__list'>
                            {cart.map(item => {
                                return <BagItem key={item.id} product={item} mainClass='BagItemBanner' />
                            })}
                        </ul>
                        <div className="bagPreview__totalPrice">
                            <span className='bagPreview__totalPrice-title'>Total</span>
                            <span className='bagPreview__totalPrice-amount'>{activeCurrency}{totalCount.toFixed(2)}</span>
                        </div>
                        <div className="bagPreview__buttons">
                            <Link onClick={this.showBagPreview} to={'/cart'}
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
        priceLoadingStatus: state.cart.loadingStatus,
        activeCategory: state.activeCategory.name,
        activeCurrency: state.activeCurrency.symbol
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // fetchPrices: (symbol) => dispatch(fetchPrices(symbol))
    }
}

Actions.propTypes = {
    // currentCurrency: PropTypes.string.isRequired,
    // currencies: PropTypes.array.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(Actions);