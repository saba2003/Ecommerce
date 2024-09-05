import React, { Component } from 'react';
import { CategoryContext } from '../Layouts/RootLayout';

class Header extends Component {
  render() {
    return (
      <CategoryContext.Consumer>
        {({ category, changeCategory }) => (
          <header>
            <h1>Category: {category}</h1>
            <button onClick={() => changeCategory('tech')}>Tech</button>
            <button onClick={() => changeCategory('clothes')}>Clothes</button>
            <button onClick={() => changeCategory('all')}>All</button>
          </header>
        )}
      </CategoryContext.Consumer>
    );
  }
}

export default Header;
