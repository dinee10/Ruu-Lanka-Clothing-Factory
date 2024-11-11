import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { StarFilled } from "@ant-design/icons";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import chart from "../../assets/chart.png"
import { CartContext } from "../../Features/ContextProvider";


function ProductView() {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null); // State to store the product details
    const navigate = useNavigate()

    const {dispatch} = useContext(CartContext)

    useEffect(() => {
        // Fetch the product details including the image URL
        axios
            .get(`http://localhost:5174/product/${id}`)
            .then((result) => {
                setProduct(result.data.product); // Set the fetched product data
            })
            .catch((err) => console.log(err));
    }, [id]);

    if (!product) return <div>Loading...</div>; // Show loading until product is fetched

    return (
        <div>
            <Nav />
            <section>
                <div
                    className="d-flex gap-3 flex-column flex-md-row p-4 bg-dark rounded align-items-center justify-content-between"
                    style={{ height: "calc(100vh - 4rem)" }}
                >
                    {/* Product Image Section */}
                    <div className="w-100 w-md-50 bg-white mr-3 p-5 rounded shadow-sm mb-4 mb-md-0">
                        <div className="position-relative">
                            <img
                                src={`http://localhost:5174/${product.image}`}
                                alt={product.name}
                                className="img-fluid rounded w-100 shadow-lg"
                                style={{ maxHeight: "500px", objectFit: "cover" }}
                            />
                            <div
                                className="position-absolute top-0 end-0 bg-warning px-3 py-1 rounded-end"
                                style={{ zIndex: 2 }}
                            >
                                New
                            </div>
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="w-100 w-md-50 bg-white p-4 rounded shadow-lg">
                        <div>
                            {/* Product Name */}
                            <h2 className="mb-3 text-black fw-bold">{product.name}</h2>

                            {/* Star Rating */}
                            <div className="d-flex align-items-center mb-3">
                                <StarFilled className="text-warning me-1" />
                                <StarFilled className="text-warning me-1" />
                                <StarFilled className="text-warning me-1" />
                                <StarFilled className="text-warning me-1" />
                                <StarFilled className="text-warning me-1" />
                                <span className="ms-2">(223 Reviews)</span>
                            </div>

                            {/* Price and Description */}
                            <div className="mb-4">
                                <h3 className="text-success d-inline-block me-3 fw-bold">
                                    Rs.{product.price}
                                </h3>
                                <p className="lead text-muted">{product.description}</p>
                            </div>

                            {/* Select Size */}
                            <div className="mb-4">
                                <h5 className="text-secondary mb-2">Select Size:</h5>
                                <div className="btn-group" role="group">
                                    <button className="btn btn-outline-info">S</button>
                                    <button className="btn btn-outline-info">M</button>
                                    <button className="btn btn-outline-info">L</button>
                                    <button className="btn btn-outline-info">XL</button>
                                </div>
                            </div>

                            {/* Size Chart */}
                            <div className="mb-4">
                                <h5 className="text-secondary">Size Chart</h5>
                                <img
                                    src={chart}
                                    alt="Size Chart"
                                    className="img-fluid w-25 rounded shadow-sm mb-3 border border-light"
                                />
                            </div>

                            {/* Add to Cart and Buy Now Buttons */}
                            <div className="mb-4 d-flex align-items-center">
                                <button className="btn btn-lg btn-outline-info me-3" onClick={() => dispatch({ type: "Add", product: product})}>
                                    <i className="bi bi-cart-plus me-2"></i>
                                    Add to Cart
                                </button>
                                <button className="btn btn-lg btn-info" onClick={() => navigate('/checkout')}>
                                    <i className="bi bi-lightning-fill me-2"></i>
                                    Buy Now
                                </button>
                            </div>

                            {/* Category */}
                            <div className="d-flex justify-content-start">
                                <p className="text-muted fw-bold">
                                    <i className="bi bi-tags me-2"></i>
                                    Category: {product.category}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>



    );
}

export default ProductView;