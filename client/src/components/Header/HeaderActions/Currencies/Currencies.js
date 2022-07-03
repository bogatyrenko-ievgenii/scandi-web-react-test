import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getCurrencies from '../../../../graphql/queries/getCurrency';
import { changeCurrency } from '../../../../redux/actions';
import Spinner from '../../../Spinner';

import CurrenciesItem from '../CurrenciesItem';

class Currencies extends PureComponent {

    state = {
        loading: false,
        error: false,
        currencies: [],
    }

    componentDidMount() {
        this.handleGetCurrencies();
    }


    handleGetCurrencies = () => {
        const { activeCurrency, changeCurrency } = this.props;
        this.setState({ loading: true })
        getCurrencies
            .then(response => {
                if (!activeCurrency) {
                    changeCurrency(response.data.currencies[0].symbol)
                }
                this.setState({
                    currencies: response.data.currencies,
                    loading: response.loading
                })
            }).catch(() => this.setState({ error: 'fetching error', loading: false }))
    }


    render() {
        const mainClass = 'Currencies';
        const { showSelect } = this.props;
        const { currencies, error, loading } = this.state;

        const processing = loading ? <div className={mainClass}><Spinner size={114} /> </div> : null;
        const badRequest = error ? <div className={mainClass}>{error}</div> : null;

        return (
            <>
                {processing}
                {badRequest}
                {!(processing || badRequest) &&
                    <ul className={mainClass}>
                        {currencies.map((currency, idx) => {
                            return <CurrenciesItem key={currency.label + idx} currency={currency}
                                close={showSelect} />
                        })}
                    </ul>}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeCurrency: state.activeCurrency.symbol
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeCurrency: (symbol) => dispatch(changeCurrency(symbol)),
    }
}

Currencies.propTypes = {
    activeCurrency: PropTypes.string.isRequired,
    showSelect: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);