import { PureComponent } from 'react';
import parse from 'html-react-parser'
import { connect } from 'react-redux';
import { addToCart } from '../../../redux/actions';

class ProdDetails extends PureComponent {

    state = {
        amount: '',
        attrQty: 0,
        selectedAttributes: {},
        activeBtn: false
    }

    componentDidMount() {
        this.getAmount();
        this.getAttributesLength();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activeCurrency.symblo !== this.props.activeCurrency.symbol) {
            this.getAmount();
        }
        if (prevState.selectedAttributes !== this.state.selectedAttributes) {
            this.getActiveBtn();
        }
    }

    addToSelectedAttributes = (key, value) => {
        const { attrQty, selectedAttributes } = this.state;
        this.setState(({ selectedAttributes }) => ({
            selectedAttributes: { ...selectedAttributes, [key]: value }
        }))
        if (attrQty === selectedAttributes.length) {
            this.getActiveBtn();
        }
    }
    getActiveBtn = () => {
        this.setState({ activeBtn: true })
    }

    getAttributesLength = () => {
        this.setState({ attrQty: this.props.attr.length })
    }

    getAmount = () => {
        const prices = this.props.prices;
        return prices.forEach((price) => {
            if (price.currency.symbol === this.props.activeCurrency.symbol) {
                this.setState({ amount: price.amount })
            }
        })
    }

    render() {
        const { brand, name, attr, descr, activeCurrency, addToCart } = this.props;
        const { amount, activeBtn, selectedAttributes } = this.state;
        const notFound = !(amount || activeCurrency.symbol) ? <div>Not found</div> : null;
        const price = !notFound ? <div className='Pdp__amount'>{activeCurrency.symbol}{amount}</div> : null;
        // console.log(this.props);
        return (
            <div className='Pdp__details'>
                <h3 className='Pdp__brand'>{brand}</h3>
                <div className='Pdp__name'>{name}</div>
                <ul className='Pdp__attributes'>
                    {attr.map((prop) => {
                        return <Attributes key={prop.id} name={prop.name}
                            items={prop.items} id={prop.id}
                            addToSelected={this.addToSelectedAttributes} />
                    })}
                </ul>
                <div className="Pdp__attrTitle">Price:</div>
                {notFound}
                {price}
                <button type='button' disabled={!activeBtn} onClick={() => addToCart(selectedAttributes)}
                    className={`Pdp__button ${activeBtn && 'activeBtn'}`}>add to card</button>
                <div className='Pdp__descr'>{parse(`${descr}`)}</div>
            </div>
        );
    }
}

class Attributes extends PureComponent {

    state = {
        selected: null,
    }

    onSelect = (value) => {
        const { id, addToSelected } = this.props
        if (this.state.selected === value) {
            return
        } else {
            this.setState(({ selected }) => ({
                selected: value
            }))
            addToSelected(id, value)
        }
    }

    render() {
        const { name, items, id } = this.props;
        return (
            <li className='Pdp__attribute'>
                <div className='Pdp__attrTitle'>{name}:</div>
                <ul className='Pdp__params'>
                    {items.map((item, idx) => {
                        return <Attribute key={idx} type={id} item={item.value}
                            selected={this.state.selected} click={() => this.onSelect(item.value)} />
                    })}
                </ul>
            </li>
        )
    }
}

class Attribute extends PureComponent {


    render() {
        const { type, item, selected, click } = this.props;
        const other = type !== 'Color' ? 'other' : null;
        const color = type === 'Color' ? 'Color' : null;
        const bg = color ? item : '';

        const active = selected === item && color ? 'activeCo' : '';
        const activeOth = selected === item && other ? 'activeOth' : '';

        return (
            <li onClick={click} style={{ backgroundColor: bg }}
                className={`Pdp__param-${color || other} ${active || activeOth}`}>
                {other && item}
            </li>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeCurrency: state.activeCurrency,
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (item) => dispatch(addToCart(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProdDetails);