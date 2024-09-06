import React, { Component } from 'react';
import { CategoryContext } from '../helpers/CategoryContext';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <CategoryContext.Consumer>
        {({ category, changeCategory }) => (
          <header>
            <h1>Category: {category}</h1>
            <Link to={"/"}>
              <button onClick={() => changeCategory('tech')}>Tech</button>
              <button onClick={() => changeCategory('clothes')}>Clothes</button>
              <button onClick={() => changeCategory('all')}>All</button>
            </Link>
          </header>
        )}
      </CategoryContext.Consumer>
    );
  }
}

export default Header;
