import React, { useState } from 'react'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddFeedback() {
  const [email, setEmail] = useState("")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      isValid = false;
      errors.email = "Please enter valid email address";
    }

    setErrors(errors);
    return isValid;
  }

  const Submit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const feedbackData = {
        email,
        title,
        message
    }

    axios
      .post("http://localhost:5174/feedback", feedbackData)
      .then(() => {
        alert("Feedback Added");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    
    <div>
      <Nav />
      <div className="container-fluid">
        <div className="row p-5 justify-content-center align-items-center bg-dark">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg d-flex flex-column" style={{ minHeight: "500px" }}>
              <div className="card-body p-5 d-flex flex-column justify-content-between">
                <h2 className="text-center mb-4">We Value Your Feedback</h2>
                
                <form className="flex-grow-2" onSubmit={Submit}>
                  {/* Email Field */}
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      placeholder="Enter your email" 
                      required 
                      style={{ padding: '10px' }} 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-danger">{errors.email}</p>}
                  </div>

                  {/* Title Dropdown */}
                  <div className="form-group mb-4 position-relative">
                    <label htmlFor="title" className="form-label">Feedback Type</label>
                    <select 
                      className="form-control" 
                      id="title" 
                      required 
                      style={{ appearance: 'none', paddingRight: '40px', padding: '5px' }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    >
                      <option value="" disabled>Select a category</option>
                      <option value="Product">Product</option>
                      <option value="Service">Service</option>
                      <option value="Other">Other</option>
                    </select>
                    <i className="fa fa-chevron-down position-absolute" 
                      style={{ top: '45px', right: '10px', pointerEvents: 'none' }}>
                    </i> {/* Dropdown Icon */}
                  </div>

                  {/* Message Field */}
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">Your Message</label>
                    <textarea 
                      className="form-control" 
                      id="message" 
                      rows="5" 
                      placeholder="Write your feedback here" 
                      required 
                      style={{ padding: '10px' }}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)} 
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-info w-100 p-2">Send Feedback</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
    
  )
}

export default AddFeedback