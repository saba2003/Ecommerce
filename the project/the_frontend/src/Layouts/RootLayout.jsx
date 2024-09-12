import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { CategoryContext } from '../helpers/CategoryContext';

class RootLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all', // initial category
      filter: false
    };
  }

  // Function to change the category
  changeCategory = (newCategory) => {
    this.setState({ category: newCategory });
  };

  toggleFilter = () => {
    this.setState({ filter: !this.state.filter });
  };

  render() {
    return (
      <CategoryContext.Provider 
        value={{
          category: this.state.category,
          filter: this.state.filter,
          changeCategory: this.changeCategory,
          toggleFilter: this.toggleFilter
        }}
      >
        <div className="root-layout">
          <Header />
          <div className="content">
            {/* {this.state.filter === true ? <div className='filter'></div> : ''} */}
            
            <Outlet />
          </div>
        </div>
      </CategoryContext.Provider>
    );
  }
}

export default RootLayout;
