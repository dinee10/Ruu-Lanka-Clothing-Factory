import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function AddProduct() {
  const [product_id, setProduct_id] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // State to store image
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Access the uploaded file
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    // Product ID Validation (4-10 letters and numbers only)
    const productIdRegex = /^[a-zA-Z0-9]{4,10}$/;
    if (!productIdRegex.test(product_id)) {
      isValid = false;
      errors.product_id = "Product ID must be contain only 4-10 letters and numbers.";
    }

    // Name Validation (letters and spaces only)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      isValid = false;
      errors.name = "Name should only contain letters and spaces.";
    }

    // Price Validation (valid numerical value)
    if (isNaN(price) || price <= 0) {
      isValid = false;
      errors.price = "Please enter a valid price.";
    }

    setErrors(errors);
    return isValid;
  };

  const Submit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Creating FormData to send both text and file data
    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("image", image); // Append the image file

    axios
      .post("http://localhost:5174/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      })
      .then(() => {
        Swal.fire({
          title: "Successful",
          text: "Product added to the list successfully",
          icon: "success",
        }).then(() => navigate("/admin/list"));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container bg-white rounded shadow m-4 p-4 mt-5">
        <h2 className="mb-4">Add Product</h2>

        <form onSubmit={Submit}>
          {/* Product ID Field */}
          <div className="form-group mb-3">
            <label htmlFor="product_id" className="form-label">
              Product ID
            </label>
            <input
              type="text"
              className="form-control"
              id="product_id"
              required
              onChange={(e) => setProduct_id(e.target.value)}
            />
            {errors.product_id && <p className="text-danger">{errors.product_id}</p>}
          </div>

          {/* Name Field */}
          <div className="form-group mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>

          {/* Description Field */}
          <div className="form-group mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Category Field */}
          <div className="form-group mb-3 position-relative">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-control"
              id="category"
              required
              onChange={(e) => setCategory(e.target.value)}
              style={{ appearance: 'none', paddingRight: '40px' }}
            >
              <option value="" disabled selected>Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
            <i className="fa fa-chevron-down position-absolute" style={{ top: '45px', right: '10px', pointerEvents: 'none' }}></i> {/* Font Awesome icon */}
          </div>

          {/* Price Field */}
          <div className="form-group mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <p className="text-danger">{errors.price}</p>}
          </div>

          {/* Upload Image Field */}
          <div className="form-group mb-4">
            <label htmlFor="image" className="form-label">
              Upload Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              required
              onChange={handleImageChange}
            />
          </div>

          {/* Submit Button */}
          <div className="form-btn">
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
