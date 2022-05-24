import { PureComponent } from "react";
import { connect } from "react-redux";

import { changeCurrency } from "../../../../redux/actions";


class Currencies extends PureComponent {

    state = {
        mouseOverStyle: ''
    }

    handleClick = (value) => {
        const { change, close, changeCurrency, currency } = this.props;
        change(value);
        close();
        changeCurrency(currency.symbol);
        localStorage.setItem('currency', value)
    }

    onEnter = () => this.setState({ mouseOverStyle: 'active' });
    onExit = () => this.setState({ mouseOverStyle: '' });

    render() {
        const { currency } = this.props;
        return (
            <li
                onClick={(event) => this.handleClick(currency.symbol)}
                className={`Currencies__item ${this.state.mouseOverStyle}`}
            ><span onMouseOver={this.onEnter} onMouseOut={this.onExit}>{currency.symbol} {currency.label}</span>
            </li>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeCurrency: state.activeCurrency
    }
}

function mapDispatchToProps(dispatch) {
    return { changeCurrency: (symbol) => dispatch(changeCurrency(symbol)) }
}


export default connect(mapStateToProps, mapDispatchToProps)(Currencies);