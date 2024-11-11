import React, { useState } from 'react'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import { UserOutlined, MailOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [shipping_address, setShippingAddress] = useState("")
    const [contact_number, setContactNumber] = useState("")
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const validateForm = () => {
        let isValid = true;
        let errors = {};
    
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
    
        const deliveryData = {
            name,
            email,
            shipping_address,
            contact_number
        }
    
        axios
          .post("http://localhost:5174/detail", deliveryData)
          .then(() => {
            alert("Details Added");
            //window.location.reload();
            navigate('/myorder')
          })
          .catch((err) => console.log(err));
    };

  return (
      <div>
          <Nav />
          <div className="container-fluid  ">
              <div className="row p-5 justify-content-center bg-dark">
                  {/* Left side: Customer Information */}
                  <div className="col-md-5 mb-4 p-5 shadow rounded bg-dark-subtle">
                      <h3 className="text-black mb-3 text-center">Delivery Details</h3>
                      <form onSubmit={Submit}>
                          {/* Name */}
                          <div className="mb-3">
                              <label htmlFor="formName" className="form-label text-black">Name</label>
                              <div className="input-group">
                                  <span className="input-group-text">
                                      <UserOutlined />
                                  </span>
                                  <input 
                                    type="text" 
                                    id="formName" 
                                    className="form-control" 
                                    placeholder="Enter your name"
                                    required 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                  />
                              </div>
                              {errors.name && <p className="text-danger">{errors.name}</p>}
                          </div>

                          {/* Email */}
                          <div className="mb-3">
                              <label htmlFor="email" className="form-label text-black">Email</label>
                              <div className="input-group">
                                  <span className="input-group-text">
                                      <MailOutlined />
                                  </span>
                                  <input 
                                    type="email" 
                                    id="email" 
                                    className="form-control" 
                                    placeholder="Enter your email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                              </div>
                              {errors.email && <p className="text-danger">{errors.email}</p>}
                          </div>

                          {/* Shipping Address */}
                          <div className="mb-3">
                              <label htmlFor="formShippingAddress" className="form-label text-black">Shipping Address</label>
                              <div className="input-group">
                                  <span className="input-group-text">
                                      <HomeOutlined />
                                  </span>
                                  <input 
                                    type="text" 
                                    id="formShippingAddress" 
                                    className="form-control" 
                                    placeholder="Enter your shipping address" 
                                    required
                                    value={shipping_address}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                  />
                              </div>
                          </div>

                          {/* Phone */}
                          <div className="mb-3">
                              <label htmlFor="contact_number" className="form-label text-black">Phone</label>
                              <div className="input-group">
                                  <span className="input-group-text">
                                      <PhoneOutlined />
                                  </span>
                                  <input 
                                    type="tel" 
                                    id="contact_number" 
                                    className="form-control" 
                                    placeholder="Enter your phone number"
                                    required 
                                    value={contact_number}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                  />
                              </div>
                              {errors.contact_number && <p className="text-danger">{errors.contact_number}</p>}
                          </div>
                          <button type="submit" className="btn btn-info w-100 mt-3">Complete Payment</button>
                      </form>
                  </div>
              </div>
          </div>
          <Footer />
      </div>
  )
}

export default Checkout;
