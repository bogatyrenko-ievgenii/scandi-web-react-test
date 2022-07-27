import { PureComponent } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import * as actions from '../../redux/actions';
import { getProductByID } from '../../graphql/queries/getProductByID';
import Attributes from "../Attributes";
import Spinner from "../Spinner";
import Bin from "./icons/Bin";

import './BagItemMiniCart.scss';
import './BagItemCart.scss';

class BagItem extends PureComponent {
    state = {
        loading: false,
        error: false,
        brand: null,
        name: null,
        gallery: [],
        attributes: [],
    }

    componentDidMount() {
        this.getData();
    }

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
                this.setState({ error: 'Product was not found...', loading: false })
            })
    }


    render() {

        const { brand, name, gallery, attributes, loading, error } = this.state;
        const { activeCurrency, decrQtyCartItem, incrQtyCartItem, product, removeFromCart, render } = this.props;

        const processing = loading ? <Spinner size={100} /> : null;
        const NotFound = error ? <div style={{ margin: '20px' }}>{error}</div> : null;
        const bagItem = !(loading || error);

        const mainClass = render ? 'BagItemCart' : 'BagItemMiniCart';

        const buttonSwitcher = product.qty > 0
            ? <button className={`${mainClass}__operator ${mainClass}__operator-decr`} onClick={() => decrQtyCartItem(product.id)} />
            : <button className={`${mainClass}__operator`} onClick={() => removeFromCart(product.id)}><Bin /></button>

        const galleryShow = render ? render : () => <img className={`${mainClass}__image`} src={gallery[0]} alt={name} />

        return (
            <>
                {processing}
                {NotFound}
                {bagItem &&
                    <>
                        <div className={`${mainClass}`}>
                            <div className={`${mainClass}__details`}>
                                <h3 className={`${mainClass}__brand`}>{brand}</h3>
                                <div className={`${mainClass}__name`}>{name}</div>
                                <div className={`${mainClass}__price`}>
                                    {activeCurrency}{product.activePrice.toFixed(2)}
                                </div>
                                <ul className={`${mainClass}__attrs`}>
                                    {attributes.map(attribute => {
                                        return <Attributes key={nanoid()} name={attribute.name}
                                            items={attribute.items} blockName={mainClass} hasCarousel={!!render} defaultAttributes={product.items}
                                            id={product.id}
                                        />
                                    })}
                                </ul>
                            </div>

                            <div className={`${mainClass}__wrapper`}>
                                <div className={`${mainClass}__counter`}>
                                    <button
                                        className={`${mainClass}__operator ${mainClass}__operator-incr`}
                                        onClick={() => incrQtyCartItem(product.id)} />
                                    {product.qty}
                                    {buttonSwitcher}
                                </div>
                                {galleryShow(gallery)}
                            </div>

                        </div>
                    </>
                }
            </>)
    }
}

function mapStateToProps(state) {
    return {
        activeCurrency: state.activeCurrency.symbol
    }
}

BagItem.propTypes = {
    activeCurrency: PropTypes.string.isRequired,
    mainClass: PropTypes.string.isRequired,
    product: PropTypes.object.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    decrQtyCartItem: PropTypes.func.isRequired,
    incrQtyCartItem: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, actions)(BagItem);