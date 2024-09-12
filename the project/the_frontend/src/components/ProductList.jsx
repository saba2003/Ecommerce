import React, { Component } from "react";
import { 
    GET_PRODUCT,
    GET_ALL_PRODUCTS, 
    GET_TECH_PRODUCTS, 
    GET_CLOTHES_PRODUCTS 
} from "../graphql/queries";
import { CategoryContext } from '../helpers/CategoryContext'; // Import the context
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],  // Initialize with an empty array
      category: null,
      loading: true, // Add loading state
    };
  }

  // Fetch products when the component mounts
  async componentDidMount() {
    const category = this.context.category; // Access category from context
    this.setState({ category: category });
    this.changeProducts(category); // Fetch products based on initial category
  }

  // Fetch products based on the provided query
  fetchProducts = async (Query) => {
    try {
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: Query,
        }),
      });

      const json = await response.json();

      if (json.data) {
        if (Query === GET_ALL_PRODUCTS) {
          this.setState({ products: json.data.allCategory, loading: false });
        } else if (Query === GET_TECH_PRODUCTS) {
          this.setState({ products: json.data.techCategory, loading: false });
        } else if (Query === GET_CLOTHES_PRODUCTS) {
          this.setState({ products: json.data.clothesCategory, loading: false });
        }
      } else {
        console.error("Failed to fetch products");
        this.setState({ loading: false }); // Ensure loading is false even on error
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      this.setState({ loading: false }); // Ensure loading is false even on error
    }
  }

  // Change the products based on the category
  changeProducts = (category) => {
    this.setState({ loading: true }); // Set loading before fetching
    if (category === 'tech') {
      this.fetchProducts(GET_TECH_PRODUCTS);
    } else if (category === 'clothes') {
      this.fetchProducts(GET_CLOTHES_PRODUCTS);
    } else {
      this.fetchProducts(GET_ALL_PRODUCTS);
    }
  }

  // Update when the category changes in the context
  componentDidUpdate(prevProps, prevState) {
    const currentCategory = this.context.category; // Access category from context
    if (this.context.category !== prevState.category) {
      // Only update the products if the category has changed
      this.changeProducts(currentCategory); // Fetch products based on new category
      this.setState({ category: currentCategory });
    }
  }

  async addToCart(product_id) {
    try {
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: GET_PRODUCT(product_id),
        }),
      });

      const json = await response.json();

      if (json.data) {
        const product = json.data.Product[0]
        const selectedAttributes = new Map([])
        const getSelectedItems = (product) => {
          product.attribute.forEach(attribute => {
            selectedAttributes.set(attribute.id, attribute.attribute_items[0].value)
          });
        }
        getSelectedItems(product)

        const data = {
          id: product.id,
          name: product.name,
          image_url: product.gallery[0].url,
          attributes: product.attribute,
          selectedAttributes: selectedAttributes,
          currency_symbol: product.currency_symbol,
          amount: product.amount,
        };
        this.props.addToCart(data);

      } else {
        console.error("Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  render() {
    const { products, loading } = this.state;

    if (loading) {
      return <div>Loading products...</div>; // Display loading state
    }

    if (!products || products.length === 0) { // Check if products is still undefined or empty
      return <div>No products available</div>;
    }

    return (
      <div className="products">
        {products.map((product) => (
              <div 
                key={product.id} 
                className={`product-card ${product.stock === false ? 'out-of-stock' : ''}`}
                data-testid={`product-${product.name.split(' ').join('-')}`}
                
              >
                
              <Link to={`/product/${product.id}`}  className="image-box">
                <img src={product.image_url} alt={product.name} />
              </Link>

              <div className="info">

                <h3>{product.name}</h3>
                <h3 className="price">{product.symbol}{product.amount}.00</h3>

              </div>
              <div
                onClick={() => this.addToCart(product.id)}
                className="cart-image"></div>
              <h2>OUT OF STOCK</h2>
            </div>
        ))}
      </div>
    );
  }
}

// Consume the category context
ProductList.contextType = CategoryContext;

// Map Redux state to component props
const mapStateToProps = (state) => ({
  cart: state.cartState.cart,
});

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);