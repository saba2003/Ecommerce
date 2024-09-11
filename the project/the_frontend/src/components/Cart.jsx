import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    decreaseQuantity,
    increaseQuantity
} from '../redux/actions/cartActions';

class Cart extends Component {
    handleIncreaseQuantity = (id) => {
        this.props.increaseQuantity(id);
    };

    handleDecreaseQuantity = (id) => {
        this.props.decreaseQuantity(id);
    };

    placeOrder = () => {
        // db
        this.props.clearCart();  // Dispatch the clear cart action
    };

  render() {
    const { cart } = this.props;

    let total = 0;
    cart.forEach(product => {
        total += product.amount
    });

    return (
      <div className='cart'>
        <h4>My Bag. {cart.length} items</h4>
            
        <div className='cart-items'>
            {cart.map(product => (
                <div className='cart-product' key={product.id}>
                    <div className='info'>
                        <h3>{product.name}</h3>
                        <p>${product.amount}.00</p>
                        
                        
                        <div className='attributes'>
                            {product.attributes.map((attribute) => {
                                return (
                                    <div key={attribute.id}>
                                        {attribute.name} 
                                        {attribute.attribute_items.map((item) => {
                                            return (
                                                <div key={item.value}>{item.value}</div>
                                            )
                                            })
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='quantity'>
                        
                        <button className='btn' onClick={() => this.handleIncrease(product.id)}>+</button>
                            <p>{product.quantity}</p>
                        <button className='btn' onClick={() => this.handleDecrease(product.id)}>-</button>

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

// Map the state to component props
const mapStateToProps = (state) => ({
  cart: state.cartState.cart
});

// Map dispatch actions to props
const mapDispatchToProps = {
    decreaseQuantity,
    increaseQuantity
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);