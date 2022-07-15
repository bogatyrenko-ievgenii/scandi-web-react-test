import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../redux/actions';
import Container from '../Container';
import BagItem from '../BagItem';
import BackDrops from '../BackDrops';
import Carousel from '../Carousel';

import './Cart.scss';

class Cart extends PureComponent {

    state = {
        tax: 0
    }

    componentDidMount() {
        this.props.changeCategory('');
        this.setTax();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.totalCount !== this.props.totalCount) {
            this.setTax();
        }
    }

    setTax = () => {
        let count = this.props.totalCount
        this.setState({ tax: count / 100 * 21 })
    }

    render() {
        const { cart, activeCurrency, totalCount, cartItemsQty } = this.props;
        let mainClass = 'Cart';

        return (
            <section className={mainClass}>
                <Container>
                    <h1 className={`${mainClass}__title`}>Cart</h1>
                    <div className={`${mainClass}__decorLine`}></div>
                    <ul className={`${mainClass}__list`}>
                        {cart.map(item => {
                            return <li key={item.id} className={`${mainClass}__item`}>
                                <BagItem product={item} mainClass={mainClass}
                                    render={gallery => {
                                        return <Carousel gallery={gallery} />
                                    }} />
                                <div className={`${mainClass}__decorLine`}></div>
                            </li>
                        })}
                    </ul>
                    <div className={`${mainClass}__tax`}>
                        Tax 21%: <span className={`${mainClass}__digits`}>{activeCurrency}{this.state.tax.toFixed(2)}</span>
                    </div>
                    <div className={`${mainClass}__qty`}>
                        Quantity: <span className={`${mainClass}__digits`}>{cartItemsQty}</span>
                    </div>
                    <div className={`${mainClass}__total`}>
                        Total: <span className={`${mainClass}__digits`}>{activeCurrency}{totalCount.toFixed(2)}</span>
                    </div>
                    <button className={`${mainClass}__button`} onClick={() => alert('this must be "Order"...')}>order</button>
                </Container>
                <BackDrops />
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.items,
        totalCount: state.cart.totalCount,
        cartItemsQty: state.cart.itemsQty,
        activeCurrency: state.activeCurrency.symbol,
    }
}

Cart.propTypes = {
    cart: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
    cartItemsQty: PropTypes.number.isRequired,
    activeCurrency: PropTypes.string.isRequired,
    changeCategory: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, actions)(Cart);