import { Component } from 'react';
import ProductList from '../components/ProductList'
import { CategoryContext } from '../Layouts/RootLayout';

class HomePage extends Component{
    render() {
        return(
            <CategoryContext.Consumer>
                {({ category }) => (
                    <div className="home-page">
                        <ProductList category={category} />
                    </div>
                )}
            </CategoryContext.Consumer>
        ) 
    }
}

export default HomePage;