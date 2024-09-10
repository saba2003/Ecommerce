import React, { Component } from 'react';
import { CategoryContext } from '../helpers/CategoryContext';
import { NavLink, Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <CategoryContext.Consumer>
        {({ category, changeCategory }) => (
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
              <div className='logo'></div>
            </div>
          </header>
        )}
      </CategoryContext.Consumer>
    );
  }
}

export default Header;
