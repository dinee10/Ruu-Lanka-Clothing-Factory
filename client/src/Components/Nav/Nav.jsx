import { ShoppingCartOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Features/ContextProvider';


function Nav() {
  const navigate = useNavigate();
  const location = useLocation(); // To check the current location

  const {cart} = useContext(CartContext)

  const navigateToProducts =() => {
    if (location.pathname === "/") {
      // If already on the home page, scroll to products directly
      const element = document.querySelector("#products-section")
      if (element) {
        element.scrollIntoView({ behavior: "smooth"})
      }
    } else {
      // If on another page, navigate to home with the hash
      navigate("/#products-section")
    }
  };

  return (
    <div className="bg-black ">
      <nav className="mx-5 py-4">
        <div className="d-flex align-items-center justify-content-between">

          <h2 className="h2 text-white fw-bold">RuuLanka</h2>

          <div className="d-flex gap-3">
            <Link to='/' className="text-decoration-none text-white fw-medium">Home</Link>
            <a href="#" className="text-decoration-none text-white fw-medium" onClick={navigateToProducts}>Products</a>
            <Link to="#" className="text-decoration-none text-white fw-medium">About</Link>
            <Link to="/addfeedback" className="text-decoration-none text-white fw-medium">Feedback</Link>
          </div>

          <div className="d-flex align-items-center gap-4">
            <button
              onClick={() => navigate("/cart")}
              className="btn border btn-link  position-relative"
            >
              <ShoppingCartOutlined style={{ fontSize: '24px', color: 'white' }} />
              {/* Badge for showing number of items in the cart */}
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '10px' }}
              >
                {cart.length}
              </span>
            </button>

            {/* Login Button */}
            <button onClick={() => navigate("/login")} className="btn btn-outline-light ">
              Login
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
