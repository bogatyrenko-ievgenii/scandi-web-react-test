import { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { changeCurrency, fetchPrices } from "../../../../redux/actions";

class CurrenciesItem extends PureComponent {

    state = {
        mouseOverStyle: ''
    }

    handleClick = (value) => {
        const { close, changeCurrency, currency: { symbol }, fetchPrices } = this.props;
        changeCurrency(symbol);
        fetchPrices(symbol);
        localStorage.setItem('currency', value)
        close();
    }

    onEnter = () => this.setState({ mouseOverStyle: 'active' });
    onExit = () => this.setState({ mouseOverStyle: '' });

    render() {
        const { currency: { symbol, label } } = this.props;

        return (
            <li
                onClick={() => this.handleClick(symbol)}
                className={`Currencies__item ${this.state.mouseOverStyle}`}
            ><span onMouseOver={this.onEnter} onMouseOut={this.onExit}>{symbol} {label}</span>
            </li>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        changeCurrency: (symbol) => dispatch(changeCurrency(symbol)),
        fetchPrices: (symbol) => dispatch(fetchPrices(symbol))
    }
}

CurrenciesItem.propTypes = {
    close: PropTypes.func.isRequired,
    currency: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesItem);