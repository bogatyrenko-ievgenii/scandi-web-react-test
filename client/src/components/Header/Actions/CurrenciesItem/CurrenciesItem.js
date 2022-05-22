import { connect } from "react-redux";

import { changeCurrency } from "../../../../redux/actions";


const Currencies = ({ current, change, close, currency, changeCurrency }) => {

    const handleClick = (value) => {
        change(value);
        close();
        changeCurrency(currency.symbol);
        console.log(currency.symbol);
    }

    let active = current === currency.symbol ? 'active' : '';


    return (
        <li
            onClick={() => handleClick(currency.symbol)}
            className={`Currencies__item ${active}`}
        >{currency.symbol} {currency.label}
        </li>
    )
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