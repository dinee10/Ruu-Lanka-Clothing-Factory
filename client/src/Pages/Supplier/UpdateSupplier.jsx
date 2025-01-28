import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateSupplier() {
    const { id } = useParams();
    const [supplier_id, setSupplier_id] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [item, setItem] = useState("")
    const [contact_no, setContact_no] = useState("")
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        axios
          .get("http://localhost:5175/supplier/" + id)
          .then((result) => {
            const supplier = result.data.supplier;  
            setSupplier_id(supplier.supplier_id);
            setName(supplier.name);
            setEmail(supplier.email);
            setItem(supplier.item);
            setContact_no(supplier.contact_no);
          })
          .catch((err) => console.log(err));
      }, [id]);


    const validateForm = () => {
        let isValid = true;
        let errors = {};
    
        // Supplier ID Validation (4-10 letters and numbers only)
        const supplierIdRegex = /^[a-zA-Z0-9]{4,10}$/;
        if (!supplierIdRegex.test(supplier_id)) {
          isValid = false;
          errors.supplier_id = "Supplier ID must be contain only 4-10 letters and numbers.";
        }
    
        // Name Validation (letters and spaces only)
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) {
          isValid = false;
          errors.name = "Name should only contain letters and spaces.";
        }
    
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          isValid = false;
          errors.email = "Please enter valid email address";
        }  

        // Contact Number Validation (10 digits)
        const contactNoRegex = /^[0-9]{10}$/;
        if (!contactNoRegex.test(contact_no)) {
          isValid = false;
          errors.contact_no = "Contact number must be 10 digits.";
        }
    
        setErrors(errors);
        return isValid;
    };

    const Update = (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
           return;
        }
    
        const supplierData = {
            supplier_id,
            name,
            email,
            item,
            contact_no
        }
    
        axios
          .put("http://localhost:5175/supplier/" + id, supplierData)
          .then(() => {
            Swal.fire({
              title: "Updated",
              text: "Supplier details updated",
              icon: "success",
            }).then(() => {
              navigate("/admin/supplier");
            });
          })
          .catch((err) => console.log(err));
      };

  return (
    <div>
          <div className="container bg-white rounded shadow m-4 p-4 mt-5">
              <h2 className="mb-4">Update Supplier</h2>
              <form onSubmit={Update}>
                  <div className="form-group mb-3">
                      <label htmlFor="supplier_id" className="form-label">Supplier ID</label>
                      <input
                          type="text"
                          className="form-control"
                          id="supplier_id"
                          required
                          value={supplier_id}
                          onChange={(e) => setSupplier_id(e.target.value)}
                      />
                      {errors.supplier_id && <p className="text-danger">{errors.supplier_id}</p>}
                  </div>

                  {/* Name Field */}
                  <div className="form-group mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                          type="text"
                          className="form-control"
                          id="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && <p className="text-danger">{errors.name}</p>}
                  </div>

                  {/* Email Field */}
                  <div className="form-group mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                          type="email"
                          className="form-control"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <p className="text-danger">{errors.email}</p>}
                  </div>

                  {/* Item Field */}
                  <div className="form-group mb-3">
                      <label htmlFor="item" className="form-label">Supply Item</label>
                      <input
                          type="text"
                          className="form-control"
                          id="item"
                          required
                          value={item}
                          onChange={(e) => setItem(e.target.value)}
                      />
                  </div>

                  {/* Contact No Field */}
                  <div className="form-group mb-3">
                      <label htmlFor="contact_number" className="form-label">Phone</label>
                      <input
                          type="text"
                          className="form-control"
                          id="contact_number"
                          required
                          value={contact_no}
                          onChange={(e) => setContact_no(e.target.value)}
                      />
                      {errors.contact_no && <p className="text-danger">{errors.contact_no}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="form-btn">
                      <button type="submit" className="btn btn-primary">
                          Update Supplier
                      </button>
                  </div>
              </form>
          </div>
      </div>
  )
}

export default UpdateSupplier