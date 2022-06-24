import onRequest from '../request';

export default onRequest(`query NavQuery {
    categories {
        name
    }
}`)