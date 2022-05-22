import { PureComponent } from "react"
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import cartIcon from './../icons/Vector.svg'

class CatalogueItem extends PureComponent {
    state = {
        showBtn: false,
        symbol: '',
        amount: null
    }

    componentDidMount() {
        this.changeCurrency()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeCurrency.symbol !== this.props.symbol) {
            this.changeCurrency()
        }
    }

    changeCurrency = () => {
        const { product, activeCurrency } = this.props;
        const { prices } = product;
        const { symbol } = activeCurrency;

        prices.forEach((price) => {
            if (price.currency.symbol === symbol) {
                this.setState({ symbol: symbol, amount: price.amount })
            }
        })
    }

    showBtn = (outOfStock) => {
        if (!outOfStock) {
            this.setState({ showBtn: true })
        }
    }

    hideBtn = () => {
        this.setState({ showBtn: false })
    }

    render() {
        const { product } = this.props;
        const { showBtn, symbol, amount } = this.state;
        const outOfStock = !product.inStock;
        const classOutOfStock = outOfStock ? 'disabled' : '';
        const show = showBtn ? 'show' : '';

        return <li
            disabled={outOfStock} onMouseEnter={() => this.showBtn(classOutOfStock)}
            onMouseLeave={this.hideBtn} className={`Catalogue__item ${classOutOfStock}`}
        >
            <img className='Catalogue__image' src={product.gallery[0]} alt={product.name} />
            <div className='Catalogue__name'>{product.name}</div>
            <div className='Catalogue__price'>{symbol} {amount}</div>
            {outOfStock && <div className="Catalogue__outOfStock">out of stock</div>}
            <div className={`Catalogue__addToCart ${show}`}><img className='Catalogue__icon' src={cartIcon} alt="cart" /></div>
        </li>
    }
}

function mapStateToProps(state) {
    return {
        activeCurrency: state.activeCurrency
    }
}


// {product.prices[0].currency.symbol}
// {product.prices[0].amount}

CatalogueItem.propTypes = {
    product: PropTypes.object.isRequired,
    activeCurrency: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(CatalogueItem);