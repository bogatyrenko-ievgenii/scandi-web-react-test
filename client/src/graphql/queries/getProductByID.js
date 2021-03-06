import onRequest from "../request";

export const getProductByID = async (id) => {
  return await onRequest(`
  query GetProd {
    product (id: "${id}"){
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      }
      brand
    }
  }`)
}
