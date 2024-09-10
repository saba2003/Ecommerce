import { 
  GET_PRODUCT
} from "../../graphql/queries";
import { Component } from "react";
import withRouter from "../../helpers/withRouter";
import Attribute from "./Attribute";
import Gallery from "./Gallery"
import parse from 'html-react-parser';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      loading: true, // Add loading state
    };
  }

  fetchProduct = async (product_id) => {
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
          this.setState({ product: json.data.Product, loading: false });
      } else {
        console.error("Failed to fetch product");
        this.setState({ loading: false }); // Ensure loading is false even on error
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      this.setState({ loading: false }); // Ensure loading is false even on error
    }
  }

  async componentDidMount() {
    const product_id = this.props.params.id;
    this.fetchProduct(product_id)
  }

  render () {
    const loading = this.state.loading;
    const product = this.state.product[0]

    if (loading) {
      return <div>Loading product...</div>; // Display loading state
    }

    if (!product || product.length === 0) { // Check if product is still undefined or empty
      return <div>No product available</div>;
    }
    
    return (
      <div key={product.id} className="product">
        
        <Gallery gallery = {product.gallery} />

        <div className="info">
          <div>
            <h1>{product.name}</h1>
            <p> <strong>BRAND: </strong>{product.brand} </p>
          </div>
          
          <Attribute attributes = {product.attribute} />


          <div className="price">
            <strong>PRICE: </strong> <br />
            <b>
              {product.currency_symbol}
              {product.amount}
              .00
            </b>
            
          </div>

          <button
            className="add-to-cart-button"
            
          >ADD TO CART</button>

          {/* Using html-react-parser to parse and render the description safely */}
          <div className="desc">
            {parse(product.description)}
          </div>

        </div>
        
      </div>
    );
  }
  
}

export default withRouter(ProductPage);