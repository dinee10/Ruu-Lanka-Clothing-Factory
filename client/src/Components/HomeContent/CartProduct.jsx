import { DeleteFilled } from '@ant-design/icons'
import React, { useContext } from 'react'
import { CartContext } from '../../Features/ContextProvider'
import { useNavigate } from 'react-router-dom'
import { BsFillTrash3Fill, BsTrash3Fill } from "react-icons/bs";

const CartProduct = ({ product }) => {
    const navigate = useNavigate()
    const { cart, dispatch } = useContext(CartContext)

    return (

        <div className="card mb-4 shadow-sm border-0 rounded-4">
            <div className="row g-0 p-3 align-items-center">
                {/* Product Image */}
                <div className="col-md-3 d-flex justify-content-center">
                    <img
                        src={`http://localhost:5175/${product.image}`}
                        className="img-fluid rounded-3 shadow-sm"
                        style={{ width: "100px", height: "100px", objectFit: "cover", cursor: "pointer" }}
                        onClick={() => navigate(`/productview/${product._id}`)}
                        alt={product.name}
                    />
                </div>

                {/* Product Details */}
                <div className="col-md-5 d-flex flex-column align-items-start">
                    <div className="card-body p-0">
                        <h5 className="card-title mb-2">{product.name}</h5>
                        <p className="card-text text-muted">Rs. {product.price}</p>
                    </div>
                </div>

                {/* Quantity Controls */}
                <div className="col-md-2 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <button className="btn btn-sm bg-secondary-subtle rounded-pill px-3 me-2" onClick={() => dispatch({ type: "Decrease", _id: product._id })}>
                            <b>-</b>
                        </button>
                        <span className="bg-secondary-subtle px-3 py-1 rounded">{product.quantity}</span>
                        <button className="btn btn-sm bg-secondary-subtle rounded-pill px-3 ms-2" onClick={() => dispatch({ type: "Increase", _id: product._id })}>
                            <b>+</b>
                        </button>
                    </div>
                </div>

                {/* Remove Button */}
                <div className="col-md-2 d-flex justify-content-center">
                    <button className="btn btn-outline-dark btn-sm" onClick={() => dispatch({ type: "Remove", _id: product._id })}>
                        <BsFillTrash3Fill size={18} />
                    </button>
                </div>
            </div>
        </div>

    )
}

export default CartProduct