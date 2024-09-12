import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderContext } from '../helpers/HeaderContext';
import { 
    decreaseQuantity,
    increaseQuantity,
    clearCart
} from '../redux/actions/cartActions';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_amount: 0,
            total_price: 0
        };
    }

    handleIncreaseQuantity = (id) => {
        this.props.increaseQuantity(id);
    };

    handleDecreaseQuantity = (id) => {
        this.props.decreaseQuantity(id);
    };
    
    placeOrder = () => {
        
        this.props.clearCart();  // Dispatch the clear cart action
    };

    componentDidUpdate() {
        if(this.context.amount !== this.state.item_amount){
            this.context.changeAmount(this.state.item_amount);
        }
    }

    addOrder = async () => {
        const { cart } = this.props;
        try {
          await fetch("http://localhost:8080/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: 
                `
                    mutation {
                        PlaceOrder(
                        input: {
                            item_count: ${this.state.item_amount}
                            total: "${this.state.total_price}"
                            order_items: [
                            ${cart.map(product => `
                                {
                                item_name: "${product.name}",
                                item_amount: ${product.quantity},
                                attributes: [
                                    ${product.selectedAttributes.map(attr => `
                                    {
                                        item_attribute_name: "${attr.id}",
                                        item_attribute_value: "${attr.value}"
                                    }
                                    `).join(',')}
                                ]
                                }
                            `).join(',')}
                            ]
                        }
                        ) {
                            item_count
                            total
                        }
                    }
                `
            }),
          });
        } catch (error) {
          console.error("Error:", error);
        }
      }

  render() {
    const { cart } = this.props;

    let total = 0;
    cart.forEach(product => {
        total += (product.amount * product.quantity)
    });
    if(total !== this.state.total_price){
        this.setState({ total_price: total })
    }

    let item_count = 0;
    cart.forEach(product => {
        item_count += product.quantity
    });
    if(item_count !== this.state.item_amount){
        this.setState({ item_amount: item_count })
    }

    return (
        <div className={`cart ${this.props.filter === true ? 'display' : ''}`}>
            <h4>My Bag. {item_count} items</h4>
                
            <div className='cart-items'>
                {cart.map(product => (
                    <div className='cart-product' key={product.id}>
                        <div className='info'>
                            <h3>{product.name}</h3>
                            <p>${product.amount}.00</p>
                            
                            
                            <div className="attributes">
                                {product.attributes && product.attributes.length > 0 ? (
                                    product.attributes.map((attribute) => {
                                        if (attribute.type === "text") {
                                            return (
                                                <div key={attribute.id}>
                                                    <h4>{attribute.name.toUpperCase()}:</h4>
                                                    <div className='items text-items'>
                                                        {attribute.attribute_items.map((item, index) => (
                                                            <div 
                                                                key={index}
                                                                className={`text-item ${product.selectedAttributes.get(attribute.id) === item.value ? 'text-active' : ''}`}
                                                            >{item.value}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={attribute.id}>
                                                    <h4>{attribute.name.toUpperCase()}:</h4>
                                                    <div className='items swatch-items'>
                                                        {attribute.attribute_items.map((item, index) => {
                                                            if(attribute.name === "Color"){
                                                                return (
                                                                    <div 
                                                                        key={index}
                                                                        className={`color-item ${product.selectedAttributes.get(attribute.id) === item.value ? 'color-active' : ''}`} 
                                                                    >
                                                                        <div style={{ backgroundColor: item.value }}></div>
                                                                    </div>
                                                                )
                                                            } else {
                                                                return (
                                                                    <div 
                                                                        key={index}
                                                                        className={`text-item ${product.selectedAttributes.get(attribute.id) === item.value ? 'text-active' : ''}`}
                                                                    >{item.value}</div>
                                                                )
                                                            }
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })
                                ) : (
                                    <p>No attributes available</p>
                                )}
                            </div>
                        </div>
                        <div className='quantity'>
                            
                            <button className='btn' onClick={() => this.handleIncreaseQuantity(product.id)}>+</button>
                                <p>{product.quantity}</p>
                            <button className='btn' onClick={() => this.handleDecreaseQuantity(product.id)}>-</button>

                        </div>
                        <div className='image-box'>
                            <img src={product.image_url} alt={product.name}/>
                        </div>
                    </div>
                ))}
            </div>

            <div className='total'>
                <p>Total</p> 
                <div className='amount'>
                    ${total}
                </div>
            </div>

            <button onClick={() => this.placeOrder()}>PLACE ORDER</button>

        </div>
    );
  }
}

// Consume the category context
Cart.contextType = HeaderContext;

// Map the state to component props
const mapStateToProps = (state) => ({
  cart: state.cartState.cart
});

// Map dispatch actions to props
const mapDispatchToProps = {
    decreaseQuantity,
    increaseQuantity,
    clearCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);