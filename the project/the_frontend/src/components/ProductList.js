import React, { Component } from "react";
import { 
    GET_ALL_PRODUCTS, 
    GET_TECH_PRODUCTS, 
    GET_CLOTHES_PRODUCTS 
} from "../graphql/queries";
import { CategoryContext } from '../Layouts/RootLayout'; // Import the context

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],  // Initialize with an empty array
      loading: true, // Add loading state
      category: this.context.category, // Initialize with context category
    };
  }

  // Fetch products when the component mounts
  async componentDidMount() {
    this.changeProducts(this.state.category); // Fetch products based on initial category
  }

  // Fetch products based on the provided query
  fetchProducts = async (ProductsQuery) => {
    try {
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: ProductsQuery,
        }),
      });

      const json = await response.json();

      if (json.data) {
        if (ProductsQuery === GET_ALL_PRODUCTS) {
          this.setState({ products: json.data.allCategory, loading: false });
        } else if (ProductsQuery === GET_TECH_PRODUCTS) {
          this.setState({ products: json.data.techProducts, loading: false });
        } else if (ProductsQuery === GET_CLOTHES_PRODUCTS) {
          this.setState({ products: json.data.clothesProducts, loading: false });
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
    if (prevState.category !== currentCategory) {
      // Only update the products if the category has changed
      this.setState({ category: currentCategory }, () => {
        this.changeProducts(this.state.category); // Fetch products based on new category
      });
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
          <div key={product.id}>
            <h3>{product.name}</h3>
            <img src={product.image_url} alt={product.name} />
            <h3>{product.stock ? 'In Stock' : 'Out of Stock'}</h3>
            <h3>{product.symbol} {product.amount}</h3>
          </div>
        ))}
      </div>
    );
  }
}

// Consume the category context
ProductList.contextType = CategoryContext;

export default ProductList;
