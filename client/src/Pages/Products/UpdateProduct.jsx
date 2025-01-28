import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateProduct() {
  const { id } = useParams();
  const [product_id, setProduct_id] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // New state for the image
  const [existingImage, setExistingImage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5175/product/" + id)
      .then((result) => {
        const product = result.data.product;  // Access product details from result.data.product
        setProduct_id(product.product_id);
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setPrice(product.price);
        setExistingImage(product.image); // Load the existing image
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the uploaded file in the state
  };

  // Validation function
  const validateForm = () => {
    let isValid = true;
    let errors = {};

    // Product ID Validation (4-10 letters and numbers only)
    const productIdRegex = /^[a-zA-Z0-9]{4,10}$/;
    if (!productIdRegex.test(product_id)) {
      isValid = false;
      errors.product_id =
        "Product ID must be 4-10 characters long and contain only letters and numbers.";
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

  const Update = (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) {
      return;
    }

    // Using FormData to send both the text and the image data
    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);

    // Append image only if it is selected
    if (image) {
      formData.append("image", image);
    }

    axios
      .put("http://localhost:5175/product/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      })
      .then(() => {
        Swal.fire({
          title: "Updated",
          text: "Product details updated",
          icon: "success",
        }).then(() => {
          navigate("/admin/list");
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container bg-white rounded shadow m-4 p-4 mt-5">
        <h2 className="mb-4">Update Product</h2>
        <form onSubmit={Update}>
          {/* Product ID Field */}
          <div className="form-group mb-3">
            <label htmlFor="product_id" className="form-label">
              Product ID
            </label>
            <input
              type="text"
              className="form-control"
              id="product_id"
              name="product_id"
              value={product_id}
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
              name="name"
              value={name}
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
              name="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Category Field */}
          <div className="form-group mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-control"
              id="category"
              name="category"
              required
              value={category}
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
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <p className="text-danger">{errors.price}</p>}
          </div>

          {/* Display the Existing Image */}
          {existingImage && (
            <div className="form-group mb-4">
              <label className="form-label">Current Image</label>
              <div>
                <img
                  src={`http://localhost:5175/${existingImage}`}
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
              </div>
            </div>
          )}

          {/* Upload New Image Field */}
          <div className="form-group mb-4">
            <label htmlFor="image" className="form-label">
              Upload New Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Submit Button */}
          <div className="form-btn">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
