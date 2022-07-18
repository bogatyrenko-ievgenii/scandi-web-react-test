import onRequest from "../request";

export const getProductsByCategory = async (title) => {
  return await onRequest(`query GetCategory {
    category (input: {title: "${title}"}) {
      products {
        id
        name
        brand
        inStock
        gallery
        attributes {
          name
          items {
            value
          }
        }
        prices {
          amount
          currency {
            symbol
          }
        }
      }
    }
  }`)
}
