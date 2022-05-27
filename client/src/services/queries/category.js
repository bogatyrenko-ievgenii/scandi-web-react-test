import onRequest from "../request";

export default onRequest(`query GetCategory{
    category {
      name
      products {
       id
       name
       inStock
       gallery
       category
       prices {
        currency {
          symbol
        }
        amount
      }
          }
    }
  }
  `)


  // export default onRequest(`query GetCategory{
  //   category {
  //     name
  //     products {
  //      id
  //      name
  //      inStock
  //      gallery
  //      description
  //      category
  //      attributes {
  //       id
  //       name
  //       items {
  //         displayValue
  //         id
  //         value
  //       }
  //     }
  //      prices {
  //       currency {
  //         label
  //         symbol
  //       }
  //       amount
  //     }
  //      brand
  //         }
  //   }
  // }
  // `)
