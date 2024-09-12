import { 
  ADD_TO_CART,
  INCREASE_QUANTITY, 
  DECREASE_QUANTITY,
  CLEAR_CART
} from '../actions/cartActions';

const initialState = {
  cart: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const matchingProducts = state.cart.filter(product => product.id === action.payload.id);

      function mapsAreEqual(map1, map2) {
        
        if (map1.size !== map2.size) {
          return false;
        }

        for (let [key, value] of map1) {
          
          if (!map2.has(key) || map2.get(key) !== value) {
            return false;
          }
        }
        return true;
      }

      // Loop through the matching products and check for the same attributes
      for (const product of matchingProducts) {
        if (mapsAreEqual(product.selectedAttributes, action.payload.selectedAttributes)) {
          // If a match is found, increase quantity
          return {
            ...state,
            cart: state.cart.map(p =>
              mapsAreEqual(p.selectedAttributes, action.payload.selectedAttributes)
                ? { ...p, quantity: p.quantity + 1 }
                : p
            )
          };
        }
      }

      // If no match is found, add new product with quantity 1
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };

    case INCREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(product =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart
          .map(product =>
            product.id === action.payload
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
          .filter(product => product.quantity > 0) // Remove product if quantity is 0
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: []  // Reset the cart to an empty array
      };

    default:
      return state;
  }
};

export default cartReducer;
