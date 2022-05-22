import { PureComponent } from "react"
import PropTypes from 'prop-types'
import cartIcon from './../icons/Vector.svg'

class CatalogueItem extends PureComponent {
    state = {
        showBtn: false
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
        const { showBtn } = this.state;
        const outOfStock = !product.inStock;
        const classOutOfStock = outOfStock ? 'disabled' : '';
        const show = showBtn ? 'show' : '';

        return <li
            disabled={outOfStock} onMouseEnter={() => this.showBtn(classOutOfStock)}
            onMouseLeave={this.hideBtn} className={`Catalogue__item ${classOutOfStock}`}
        >
            <img className='Catalogue__image' src={product.gallery[0]} alt={product.name} />
            <div className='Catalogue__name'>{product.name}</div>
            <div className='Catalogue__price'>{product.prices[0].currency.symbol} {product.prices[0].amount}</div>
            {outOfStock && <div className="Catalogue__outOfStock">out of stock</div>}
            <div className={`Catalogue__addToCart ${show}`}><img className='Catalogue__icon' src={cartIcon} alt="cart" /></div>
        </li>
    }
}

CatalogueItem.propTypes = {
    product: PropTypes.object.isRequired
}

export default CatalogueItem;