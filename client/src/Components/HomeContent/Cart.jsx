import React, { useContext, useEffect } from 'react'; 
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';
import { DeleteFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { CartContext } from '../../Features/ContextProvider';
import CartProduct from './CartProduct';
import { totalItem, totalPrice } from '../../Features/CartReducer';

function Cart() {

    const navigate = useNavigate();
    const {cart} = useContext(CartContext)
   

    return (
        <div>
            <Nav />
            <div className="d-flex flex-column px-5 bg-dark" style={{ minHeight: "500px" }}>
                <div className="row justify-content-center py-5">
                    {/* Left Side: Cart Items */}
                    <div className="col-md-8">
                        <h3 className="mb-4 text-center text-white">Your Cart({totalItem(cart)})</h3>
                        {cart.map(p => (
                            <CartProduct product={p}></CartProduct>
                        ))}

                    </div>

                    {/* Right Side: Total and Checkout */}
                    <div className="col-md-4">
                        <div className="card m-3 p-4 shadow-lg border-0 rounded-4">
                            <h5 className="text-center mb-3">Order Summary</h5>
                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                                <span>Total Items</span>
                                <h4 className="text-success">{totalItem(cart)}</h4>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Total Price</span>
                                <h4 className="text-success">Rs.{totalPrice(cart)}</h4>
                            </div>
                            <button
                                className="btn btn-info w-100 rounded-3"
                                onClick={() => navigate('/checkout')}
                                disabled={totalItem(cart) === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart; 
