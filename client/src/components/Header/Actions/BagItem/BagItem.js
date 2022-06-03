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
        amount: 0,
        selected: 0
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevState) {
        if (prevState.prices !== this.state.prices) {
            this.getPrice();
        }
        if (prevState.amount !== this.state.amount) {
            this.props.getTotalCount(this.state.amount * this.props.prodFromRedux.qty)
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

    setSelected = (idx) => {
        this.setState({
            selected: idx
        })
    }

    render() {
        const { brand, name, image, attributes, amount, loading, error, selected } = this.state;
        const { currentCurrency, prodFromRedux } = this.props;

        const processing = loading ? 'Loading' : null;
        const NotFound = error ? 'Product not found' : null;
        const product = !(loading || error) ? true : null;

        const itemsAmount = prodFromRedux.qty * amount;

        return (
            <>
                {processing}
                {NotFound}
                {product &&
                    <li className='BagItem'>
                        <div className="BagItem__wrapper">
                            <div className="BagItem__details">
                                <h3 className="BagItem__brand">{brand}</h3>
                                <div className="BagItem__name">{name}</div>
                                {amount && <div className="BagItem__price">
                                    {currentCurrency}{itemsAmount.toFixed(2)}
                                </div>}
                                <ul className="BagItem__attrs">
                                    {attributes.map((attribute, idx) => {
                                        return <li key={idx} className="BagItem__attr">
                                            <div className="BagItem__attrName">{attribute.name}:</div>
                                            <ul className="BagItem__attrItems">
                                                {attribute.items.map((item, idx) => {
                                                    const color = attribute.name === 'Color' ? 'color' : '';
                                                    const other = attribute.name !== 'Color' ? 'other' : '';
                                                    const bg = color ? item.value : '';
                                                    const activeColor = color && selected === idx ? 'activeColor' : '';
                                                    const activeOther = other && selected === idx ? 'activeOther' : '';
                                                    return <li onClick={() => this.setSelected(idx)} key={idx}
                                                        className={`BagItem__attrItem ${color || other} ${activeColor || activeOther}`}
                                                        style={{ backgroundColor: bg }}
                                                    >
                                                        {other && item.value}
                                                    </li>
                                                }
                                                )}
                                            </ul>
                                        </li>
                                    })}
                                </ul>
                            </div>

                            <div className="BagItem__wrapper-inner">
                                <div className="BagItem__counter">
                                    <div className="BagItem__operator BagItem__operator-incr"></div>
                                    {prodFromRedux.qty}
                                    <div className="BagItem__operator BagItem__operator-decr"></div>
                                </div>
                                <img className="BagItem__image" src={image} alt={name} />
                            </div>
                        </div>
                    </li>
                }
            </>)
    }
}

export default BagItem;