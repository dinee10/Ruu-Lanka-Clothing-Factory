import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


function UpdateProduct() {
    const {id} = useParams()
    const [product_id, setProduct_id] = useState()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [material, setMaterial] = useState()
    const [price, setPrice] = useState()
    const navigate = useNavigate();

    useEffect(()=> {
      axios.get("http://localhost:5174/getProduct/"+id)
      .then(result => {console.log(result)
        setProduct_id(result.data.product_id)
        setName(result.data.name)
        setDescription(result.data.description)
        setMaterial(result.data.material)
        setPrice(result.data.price)
      })
      .catch(err => console.log(err))
    }, [])

    const Update = (e) => {
      e.preventDefault();

      const productData = {
        product_id,
        name,
        description,
        material,
        price
      }

      axios.put("http://localhost:5174/product/"+id, productData)
      .then(() => {
        Swal.fire({
          title: "Updated",
          text: "Product details updated",
          icon: "success"
        }).then(() => {navigate('/')})
      })
        .catch(err => console.log(err))
    }

    return (
      <div className="container-q">
        <form onSubmit={Update}>
          <h2>Update Product Details</h2>

          <div className="form-group">
            <label htmlFor="product_id">Product ID</label>
            <input type="text" name="product_id" 
            value={product_id} onChange={(e) => setProduct_id(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" 
            value={name} onChange={(e) => setName(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" 
            value={description} onChange={(e) => setDescription(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="material">Material</label>
            <input type="text" name="material" 
            value={material} onChange={(e) => setMaterial(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="text" name="price" 
            value={price} onChange={(e) => setPrice(e.target.value)}/>
          </div>
          <div className="form-btn"> 
            <button className="btn1">Update</button>
          </div>
        </form>
      </div>
    )
}

export default UpdateProduct;
