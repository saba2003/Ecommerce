import { Component } from 'react';
import ProductList from '../components/ProductList'
import { CategoryContext } from '../CategoryContext';

class HomePage extends Component{
    render() {
        return(
            <CategoryContext.Consumer>
                {({ 
                    category,
                    changeCategory 
                }) => (
                    <div className="home-page">
                        <ProductList 
                            category={category} 
                            changeCategory = {changeCategory}
                        />
                    </div>
                )}
            </CategoryContext.Consumer>
        ) 
    }
}

export default HomePage;