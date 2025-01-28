import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Admin from './Admin'
import Products from './Pages/Products/Products'
import AddProduct from './Pages/Products/AddProduct'
import UpdateProduct from './Pages/Products/UpdateProduct'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Nav from './Components/Nav/Nav'
import Order from './Pages/Order/Order'
import imagePath from "../src/result.jpeg"
import PageContent from './Components/PageContent/PageContent'
import Delivery from './Pages/Delivery/Delivery'
import Feedback from './Pages/Feedback/Feedback'
import Employee from './Pages/Employee/Employee'
import Supplier from './Pages/Supplier/Supplier'
import User from './Pages/User/User'
import Inventory from './Pages/Inventory/Inventory'
import Home from './Home'
import HomeContent_1 from './Components/HomeContent/HomeContent_1'
import HomeContent_2 from './Components/HomeContent/HomeContent_2'
import ProductView from './Components/HomeContent/ProductView'
import Cart from './Components/HomeContent/Cart'
import Checkout from './Components/HomeContent/Checkout'

import AddOrder from './Pages/Order/AddOrder'
import UpdateOrder from './Pages/Order/UpdateOrder'
import Details from './Pages/Order/Details'
import Login from './Components/HomeContent/Login'
import Signup from './Components/HomeContent/Signup'
import AddDelivery from './Pages/Delivery/AddDelivery'
import UpdateDelivery from './Pages/Delivery/UpdateDelivery'
import AddSupplier from './Pages/Supplier/AddSupplier'
import AddFeedback from './Components/HomeContent/AddFeedback'
import AddEmployee from './Pages/Employee/AddEmployee'
import ViewEmployee from './Pages/Employee/ViewEmployee'
import Salary from './Pages/Employee/Salary'
import Leave from './Pages/Employee/Leave'
import UpdateEmployee from './Pages/Employee/UpdateEmployee'
import UpdateSupplier from './Pages/Supplier/UpdateSupplier'
import Myorder from './Components/HomeContent/Myorder'
import AddInventory from './Pages/Inventory/AddInventory'
import UpdateInventory from './Pages/Inventory/UpdateInventory'
import ViewUser from './Pages/User/ViewUser'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} /> {/* Landing page */}
          <Route path='/admin' element={<Admin />}>
            <Route index element={<PageContent />} />
            <Route path='list' element={<Products />} /> {/* Relative path */}
            <Route path='create' element={<AddProduct />} /> {/* Relative path */}
            <Route path='update/:id' element={<UpdateProduct />} /> {/* Relative path */}

            <Route path='order' element={<Order />} /> {/* Relative path */}
            <Route path='details' element={<Details />} /> {/* Relative path */}
            <Route path='ordercreate' element={<AddOrder />} /> {/* Relative path */}
            <Route path='orderupdate/:id' element={<UpdateOrder />} /> {/* Relative path */}

            <Route path='delivery' element={<Delivery />} /> {/* Relative path */}
            <Route path='deliverycreate' element={<AddDelivery />} /> {/* Relative path */}
            <Route path='deliveryupdate/:id' element={<UpdateDelivery />} /> {/* Relative path */}

            <Route path='feedback' element={<Feedback />} /> {/* Relative path */}

            <Route path='employee' element={<Employee />} /> {/* Relative path */}
            <Route path='employeecreate' element={<AddEmployee />} />
            <Route path='employeeview/:id' element={<ViewEmployee />} />
            <Route path='employeeupdate/:id' element={<UpdateEmployee />} />
            <Route path='employeesalary' element={<Salary />} />
            <Route path='employeeleave' element={<Leave />} />

            <Route path='supplier' element={<Supplier />} /> {/* Relative path */}
            <Route path='suppliercreate' element={<AddSupplier />} />
            <Route path='supplierupdate/:id' element={<UpdateSupplier />} />

            <Route path='user' element={<User />} /> {/* Relative path */}
            <Route path='userview/:id' element={<ViewUser />} />

            <Route path='inventory' element={<Inventory />} /> {/* Relative path */}
            <Route path='inventorycreate' element={<AddInventory />} />
            <Route path='inventoryupdate/:id' element={<UpdateInventory />} />
          </Route>
          {/* Other routes outside of /admin */}
          <Route path='/footer' element={<Footer />} />
          <Route path='/nav' element={<Nav />} />
          <Route path='/header' element={<Header />} />
          <Route path='/productview/:id' element={<ProductView />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/myorder' element={<Myorder />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/addfeedback' element={<AddFeedback />} />

        </Routes>
      </BrowserRouter>




    </div>
  )
}

export default App;
