export const GET_PRODUCTS = `
  query {
    techProduct(id: "ps-5") {
      id
      name
      amount
      currency_symbol
      description
      gallery{
        url
      }
      attribute{
        name
        attribute_items{
          displayValue
          value
        }
      }
    }
  }
`;