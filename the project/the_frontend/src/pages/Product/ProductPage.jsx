import { 
  GET_PRODUCT
} from "../../graphql/queries";
import { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { backend_url } from "../../graphql/queries";
import Attribute from "./Attribute";
import Gallery from "./Gallery"
import parse from 'html-react-parser';
import { AttributesContext } from '../../helpers/AttributesContext'

import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      selectedAttributes: new Map([]),
      loading: true,
      button_loading: false,
      button_disabled: true
    };
  }

  fetchProduct = async (product_id) => {
    try {
      const response = await fetch(backend_url, {
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

  addToCart() {
    this.setState({ button_loading: true })

    const product = this.state.product[0]

    const data = {
      id: product.id,
      name: product.name,
      image_url: product.gallery[0].url,
      attributes: product.attribute,
      selectedAttributes: this.state.selectedAttributes,
      currency_symbol: product.currency_symbol,
      amount: product.amount,
    };
    this.props.addToCart(data);

    setTimeout(() => {
      this.setState({ button_loading: false })
    }, "2000");
  }

  changeButtonState = (newButtonState) => {
    this.setState({ button_disabled: newButtonState });
  };

  changeAttributes = (newMap) => {
    this.setState({ selectedAttributes: newMap });
  };

  async componentDidMount() {
    const product_id = this.props.params.id;
    this.fetchProduct(product_id)
  }

  render () {
    const loading = this.state.loading;
    const product = this.state.product[0]
    const button_loading = this.state.button_loading
    const button_disabled = this.state.button_disabled

    if (loading) {
      return <div>Loading product...</div>; // Display loading state
    }

    if (!product || product.length === 0) { // Check if product is still undefined or empty
      return <div>No product available</div>;
    }
    
    return (
      <AttributesContext.Provider 
        value={{
          changeButtonState: this.changeButtonState,
          selectedAttributes: this.state.selectedAttributes,
          changeAttributes: this.changeAttributes
        }}
      >
        <div key={product.id} className="product">
          
          <Gallery gallery = {product.gallery} />

          <div className="info">
            <div>
              <h1>{product.name}</h1>
              <p> <strong>BRAND: </strong>{product.brand} </p>
            </div>
            
            <Attribute attributes = {product.attribute} button_disabled = {this.state.button_disabled} />


            <div className="price">
              <strong>PRICE: </strong> <br />
              <b>
                {product.currency_symbol}
                {product.amount}
                .00
              </b>
              
            </div>

            <button
              className={`add-to-cart-button ${(button_loading === true) || (button_disabled === true) || (!product.stock) ? 'button-loading' : ''}`}
              disabled={!product.stock || button_loading}
              onClick={() => this.addToCart()}
              data-testid='add-to-cart'
            >{button_loading === true ? 'ADDING...' : 'ADD TO CART'}</button>

            {/* Using html-react-parser to parse and render the description safely */}
            <div data-testid='product-description' className="desc">
              {parse(product.description)}
            </div>

          </div>
          
        </div>
      </AttributesContext.Provider>
    );
  }
  
}


const mapStateToProps = (state) => ({
  cart: state.cartState.cart,
});

const mapDispatchToProps = {
  addToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductPage));