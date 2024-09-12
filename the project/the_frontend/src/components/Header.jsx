import React, { Component } from 'react';
import { CategoryContext } from '../helpers/CategoryContext';
import { HeaderContext } from '../helpers/HeaderContext';
import { NavLink, Link } from 'react-router-dom';

import Cart from './Cart'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
  }

  // Function to change the category
  changeAmount = (newAmount) => {
    this.setState({ amount: newAmount });
  };

  render() {
    return (
      <HeaderContext.Provider 
        value={{
          amount: this.state.amount,
          changeAmount: this.changeAmount
        }}
      >
        <CategoryContext.Consumer>
          {({ category, filter, changeCategory, toggleFilter }) => (
            <header>
              <div className='links'>
                <NavLink 
                  to={"/"} 
                  onClick={() => changeCategory('all')}
                  className={({ isActive }) => isActive ? "link-active" : "" }
                >ALL
                </NavLink>
                <NavLink 
                  to={"/tech"} 
                  onClick={() => changeCategory('tech')}
                  className={({ isActive }) => isActive ? "link-active" : "" }
                  >TECH
                </NavLink>
                <NavLink 
                  to={"/clothes"} 
                  onClick={() => changeCategory('clothes')}
                  className={({ isActive }) => isActive ? "link-active" : "" }
                  >CLOTHES
                </NavLink>
              </div>
              <Link to={"/"} className='logo-box'>
                <div className='logo'></div>
              </Link>
              <div className='cart-box' >
                <div className='logo'
                onClick={() => toggleFilter()}>
                  <div className='item-amount'>
                    {this.state.amount}
                  </div>
                </div>
                <Cart filter = {filter}/>
              </div>
            </header>
          )}
        </CategoryContext.Consumer>
      </HeaderContext.Provider>
    );
  }
}

export default Header;
