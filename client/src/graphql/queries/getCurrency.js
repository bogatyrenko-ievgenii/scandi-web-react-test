import onRequest from '../request';

export default onRequest(`query CurrencyQuery {
    currencies {
      label
      symbol
    }
  }`)
