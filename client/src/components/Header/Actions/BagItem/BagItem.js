import { PureComponent } from "react";
import { getProductByID } from '../../../../services/queries/product';

class BagItem extends PureComponent {
    state = {
        loading: false,
        error: false,
        brand: null,
        name: null,
        image: null,
        attributes: [],
        prices: [],
        amount: 0
    }

    componentDidMount() {
        this.getData();

    }

    componentDidUpdate(prevState) {
        if (prevState.prices !== this.state.prices) {
            this.getPrice();
        }
    }

    getData = () => {
        this.setState({ loading: true })
        return getProductByID(this.props.product.id)
            .then(response => {
                const product = response.data.product;
                this.setState({
                    loading: response.loading,
                    brand: product.brand,
                    name: product.name,
                    image: product.gallery[0],
                    attributes: product.attributes,
                    prices: product.prices,
                })
            }).catch(() => {
                this.setState({ error: true, loading: false })
            })
    }

    getPrice = () => {
        let currency = this.props.currentCurrency;
        this.state.prices.forEach(price => {
            if (price.currency.symbol === currency) {
                this.setState({ amount: price.amount })
            }
        })
    }


    render() {
        const { brand, name, image, attributes, amount } = this.state;
        const { currentCurrency } = this.props;

        return <li className='BagItem'>
            <div className="BagItem__wrapper">
                <div className="BagItem__details">
                    <h3 className="BagItem__brand">{brand}</h3>
                    <div className="BagItem__name">{name}</div>
                    {amount && <div className="BagItem__price">{currentCurrency}{amount}</div>}
                    <ul className="BagItem__attrs">
                        {attributes.map((attribute, idx) => {
                            // console.log(attribute);
                            return <li key={idx} className="BagItem__attr">
                                <div className="BagItem__attrName">{attribute.name}</div>
                                <ul className="BagItem__attrItems">
                                    {attribute.items.map((item, idx) => {
                                        return <li key={idx} className="BagItem__attrItem">{item.value}</li>
                                    }
                                    )}
                                </ul>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="BagItem__counter"></div>
                <div className="BagItem__imageBlock"><img className="BagItem__image" src={image} alt={name} /></div>
            </div>
        </li>
    }
}

export default BagItem;