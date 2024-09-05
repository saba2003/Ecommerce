import React, { createContext, Component } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

// Create a context for the category
export const CategoryContext = createContext();

class RootLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all', // initial category
    };
  }

  // Function to change the category
  changeCategory = (newCategory) => {
    this.setState({ category: newCategory });
  };

  render() {
    return (
      <CategoryContext.Provider value={{
        category: this.state.category,
        changeCategory: this.changeCategory
      }}>
        <div className="root-layout">
          <Header />
          <div className="content">
            <Outlet />
          </div>
        </div>
      </CategoryContext.Provider>
    );
  }
}

export default RootLayout;
