import onRequest from "../request";

export const getCurrencyByID = async (id) => {
    return await onRequest(`
    query GetCurrencyByID {
        product (id: "${id}"){
        id
        prices {
            currency {
            symbol
            }
            amount
        }
        }
    }`)
}
