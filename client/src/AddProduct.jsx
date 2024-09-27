import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2" 

function AddProduct () {
    const [product_id, setProduct_id] = useState()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [material, setMaterial] = useState()
    const [price, setPrice] = useState()
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();

        const productData = {
            product_id,
            name,
            description,
            material,
            price
        }

        axios.post("http://localhost:5174/product", productData)
        .then(() => {
            Swal.fire({
                title: "Successful",
                text: "Product added to the list successfully",
                icon: "success"
            }).then(() => navigate('/'))
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="container-q">
            <form onSubmit={Submit}>
                <h2>Add Product</h2>
                <div className="form-group">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" className="product_id" required
                    onChange={(e) => setProduct_id(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="name" required
                    onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="description" required
                    onChange={(e) => setDescription(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="material">Material</label>
                    <input type="text" className="material" required
                    onChange={(e) => setMaterial(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="text" className="price" required
                    onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div className="form-btn">    
                    <button className="btn1">Add</button>
                </div>
            </form>
	    </div>
    )
}

export default AddProduct;