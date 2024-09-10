import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';

import { Component } from 'react';

import RootLayout from './Layouts/RootLayout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/Product/ProductPage';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}> 
      <Route index element={<HomePage />}/>
      <Route path="/tech" element={<HomePage />}/>
      <Route path="/clothes" element={<HomePage />}/>

      <Route 
        path="/product/:id" 
        element={<ProductPage />}
      />

      <Route path="*" element = {<NotFound />} />
    </Route>
  )
)

class App extends Component {
  render () {
    return (
      <div className="App">
          <RouterProvider router={router} />
      </div>
    )
  }
}

export default App;