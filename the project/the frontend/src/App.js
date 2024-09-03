import {GET_PRODUCTS} from "./graphql/queries";
import { useEffect, useState } from 'react';

const fetchProducts = async () => {
  const response = await fetch('http://localhost:8080/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_PRODUCTS,
    }),
  });

  const data = await response.json();
  return data;
};

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data.data.techProduct); // Assuming techProduct is the field you want to access
    };

    getProducts();
  }, []);

  console.log(products); // Now this should log the array of products

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <img src={product.gallery[0].url} alt={product.name} />
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;