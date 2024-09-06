import { 
  GET_PRODUCT
} from "../graphql/queries";
import { Component } from "react";
import withRouter from "../components/withRouter";

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
    console.log('Product ID:', product_id);
    this.fetchProduct(product_id)
  }

  render () {
    return (
      <div className="product">
        {
          <div key={this.product.id}>
          </div>
        }
      </div>
    );
  }
  
}

export default withRouter(ProductPage);