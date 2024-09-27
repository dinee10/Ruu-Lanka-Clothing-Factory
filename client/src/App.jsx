import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Products from './Products'
import AddProduct from './AddProduct'
import UpdateProduct from './UpdateProduct'
import imagePath from "../src/result.jpeg"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Products />}></Route>
          <Route path='/create' element={<AddProduct />}></Route>
          <Route path='/update/:id' element={<UpdateProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
