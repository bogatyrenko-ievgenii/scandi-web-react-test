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
// export default onRequest(`query GetCategory{
//     category {
//       name
//       products {
//        id
//        name
//        brand
//        inStock
//        gallery
//        attributes {
//         name
//         items {
//           value
//         }
//       }
//        prices {
//         currency {
//           symbol
//         }
//         amount
//       }
//           }
//     }
//   }
//   `)


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
