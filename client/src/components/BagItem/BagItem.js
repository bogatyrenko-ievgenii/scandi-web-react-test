import { PureComponent } from "react";
import { connect } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import * as actions from '../../redux/actions';
import { getProductByID } from '../../graphql/queries/getProductByID';
import Attributes from "../Attributes";
import Spinner from "../Spinner";
import Bin from "./binSVG";
import Arrow from "./arrowSVG";

// import './BagItemBanner.scss'

class BagItem extends PureComponent {
    state = {
        loading: false,
        error: false,
        brand: null,
        name: null,
        gallery: [],
        viewImageIdx: 0,
        attributes: [],
        selected: 0,
    }

    componentDidMount() {
        this.getData();
        // this.getAmount();
    }

    // componentDidUpdate(prevProps) {
    //     const { activePrice, qty } = this.props.product;

    //     if (prevProps.product.activePrice !== activePrice
    //         || prevProps.product.qty !== qty) {
    //         this.getAmount();
    //     }
    // }

    getData = async () => {
        this.setState({ loading: true })
        await getProductByID(this.props.product.prodId)
            .then(response => {
                const product = response.data.product;
                this.setState({
                    loading: response.loading,
                    brand: product.brand,
                    name: product.name,
                    gallery: product.gallery,
                    attributes: product.attributes,
                })
            }).catch(() => {
                this.setState({ error: 'Product was not founded..', loading: false })
            })
    }

    // getAmount = () => {
    //     const { product } = this.props;
    //     this.setState({ amount: 0 });
    //     this.setState({ amount: product.activePrice * product.qty })
    // }

    setSelected = (idx) => {
        this.setState({
            selected: idx
        })
    }

    onImageSwitch = (type) => {
        let { viewImageIdx, gallery } = this.state;

        if (type === 'prev') {
            if (viewImageIdx > 0) {
                this.setState(({ viewImageIdx }) => ({
                    viewImageIdx: viewImageIdx - 1
                }))
            }
        } else if (type === 'next') {
            if (viewImageIdx < gallery.length - 1) {
                this.setState(({ viewImageIdx }) => ({
                    viewImageIdx: viewImageIdx + 1
                }))
            }
        }
    }

    render() {
        const { brand, name, gallery, viewImageIdx, attributes, loading, error } = this.state;
        const { activeCurrency, decrQtyCartItem, incrQtyCartItem, product, removeFromCart, mainClass } = this.props;

        const processing = loading ? <Spinner size={100} /> : null;
        const NotFound = error ? <div style={{ margin: '20px' }}>{error}</div> : null;
        const bagItem = !(loading || error) ? true : null;

        const buttonSwitcher = product.qty > 0
            ? <button className={`${mainClass}__operator ${mainClass}__operator-decr`} onClick={() => decrQtyCartItem(product.id)} />
            : <button className={`${mainClass}__operator`} onClick={() => removeFromCart(product.id)}><Bin /></button>

        const imageSwitcher = mainClass === 'Cart' && gallery.length > 1
            ? <div className={`${mainClass}__switchers`}>
                <button type="button" className={`${mainClass}__switcher`} onClick={() => this.onImageSwitch('prev')}>
                    <Arrow />
                </button>
                <button type="button" className={`${mainClass}__switcher ${mainClass}__switcher-reversed`} onClick={() => this.onImageSwitch('next')}>
                    <Arrow />
                </button>
            </div>
            : null;

        return (
            <>
                {processing}
                {NotFound}
                {bagItem &&
                    <>
                        <div className={`${mainClass}__wrapper`}>
                            <div className={`${mainClass}__details`}>
                                <h3 className={`${mainClass}__brand`}>{brand}</h3>
                                <div className={`${mainClass}__name`}>{name}</div>
                                <div className={`${mainClass}__price`}>
                                    {activeCurrency}{product.activePrice.toFixed(2)}
                                </div>
                                <ul className={`${mainClass}__attrs`}>
                                    {attributes.map(attribute => {
                                        return <Attributes key={nanoid()} name={attribute.name}
                                            items={attribute.items} blockName={mainClass} defaultAttributes={product.items}
                                            id={product.id}
                                        />
                                    })}
                                </ul>
                            </div>

                            <div className={`${mainClass}__wrapper-inner`}>
                                <div className={`${mainClass}__counter`}>
                                    <button
                                        className={`${mainClass}__operator ${mainClass}__operator-incr`}
                                        onClick={() => incrQtyCartItem(product.id)} />
                                    {product.qty}
                                    {buttonSwitcher}
                                </div>
                                <img className={`${mainClass}__image`} src={gallery[viewImageIdx]} alt={name} />
                                {imageSwitcher}
                            </div>

                        </div>
                    </>
                }
            </>)
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.items,
        activeCurrency: state.activeCurrency.symbol
    }
}


export default connect(mapStateToProps, actions)(BagItem);