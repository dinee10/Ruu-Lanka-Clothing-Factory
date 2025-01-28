import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function AddOrder() {
    const [order_id, setOrder_id] = useState("")
    const [name, setName] = useState("")
    const [shipping_address, setShoppingAddress] = useState("")
    const [order_status, setOrderStatus] = useState("")
    const [contact_number, setContactNumber] = useState("")
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const validateForm = () => {
        let isValid = true;
        let errors = {};
    
        // Order ID Validation (4-10 letters and numbers only)
        const orderIdRegex = /^[a-zA-Z0-9]{4,10}$/;
        if (!orderIdRegex.test(order_id)) {
          isValid = false;
          errors.order_id = "Order ID must be contain only 4-10 letters and numbers.";
        }
    
        // Name Validation (letters and spaces only)
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) {
          isValid = false;
          errors.name = "Name should only contain letters and spaces.";
        }
    
        // Contact Number Validation (numerical and 10 digits)
        const contactNumberRegex = /^[0-9]{10}$/;
        if (!contactNumberRegex.test(contact_number)) {
        isValid = false;
        errors.contact_number = "Contact number must be 10 digits.";
        }
    
        setErrors(errors);
        return isValid;
      };

    const Submit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
    
        const orderData = {
            order_id,
            name,
            shipping_address,
            order_status,
            contact_number
        }
    
        axios
          .post("http://localhost:5175/order", orderData)
          .then(() => {
            Swal.fire({
              title: "Successful",
              text: "Order added to the list successfully",
              icon: "success",
            }).then(() => navigate("/admin/order"));
          })
          .catch((err) => console.log(err));
      };

  return (
    <div>
      <div className="container bg-white rounded shadow m-4 p-4 mt-5">
        <h2 className="mb-4">Add Order</h2>

        <form onSubmit={Submit}>
          {/* Order ID Field */}
          <div className="form-group mb-3">
            <label htmlFor="order_id" className="form-label">
              Order ID
            </label>
            <input
              type="text"
              className="form-control"
              id="order_id"
              required
              onChange={(e) => setOrder_id(e.target.value)}
            />
            {errors.order_id && <p className="text-danger">{errors.order_id}</p>}
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

          {/* Shopping Address Field */}
          <div className="form-group mb-3">
            <label htmlFor="shopping_address" className="form-label">
              Shopping Address
            </label>
            <input
              type="text"
              className="form-control"
              id="shopping_address"
              required
              onChange={(e) => setShoppingAddress(e.target.value)}
            />
          </div>

          {/* Order Status Field */}
          <div className="form-group mb-3 position-relative">
            <label htmlFor="order_status" className="form-label">
              Order Status
            </label>
            <select
              className="form-control"
              id="order_status"
              required
              onChange={(e) => setOrderStatus(e.target.value)}
              style={{ appearance: 'none', paddingRight: '40px' }}
            >
              <option value="" disabled selected>Select Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Delivered">Delivered</option>
              <option value="Failed">Failed</option>
            </select>
            <i className="fa fa-chevron-down position-absolute" style={{ top: '45px', right: '10px', pointerEvents: 'none' }}></i> {/* Font Awesome icon */}
          </div>

          {/* Contact No Field */}
          <div className="form-group mb-3">
            <label htmlFor="contact_number" className="form-label">
              Contact No
            </label>
            <input
              type="text"
              className="form-control"
              id="contact_number"
              required
              onChange={(e) => setContactNumber(e.target.value)}
            />
            {errors.contact_number && <p className="text-danger">{errors.contact_number}</p>}
          </div>

          {/* Submit Button */}
          <div className="form-btn">
            <button type="submit" className="btn btn-primary">
              Add Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddOrder