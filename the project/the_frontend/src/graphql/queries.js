export const GET_ALL_PRODUCTS = `
  query {
    allCategory {
      id
      name
      image_url
      stock
      symbol
      amount
    }
  }
`;
export const GET_TECH_PRODUCTS = `
  query {
     techCategory {
      id
      name
      image_url
      stock
      symbol
      amount
    }
  }
`;
export const GET_CLOTHES_PRODUCTS = `
  query {
    clothesCategory {
      id
      name
      image_url
      stock
      symbol
      amount
    }
  }
`;

export const GET_PRODUCT = (id) => `
  query{
    Product(id: "${id}") {
      id
      name
      description
      brand
      currency_symbol
      amount
      stock
      gallery {
        url
      }
      attribute {
        id
        name
        type
        attribute_items {
          displayValue
          value
        }
      }
    } 
  }
`;