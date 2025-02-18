import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateEmployee() {
    const { id } = useParams();
    const [emp_id, setEmp_id] = useState("")
    const [name, setName] = useState("")
    const [nic, setNic] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [division, setDivision] = useState("")
    const [position, setPosition] = useState("")
    const [contact_no, setContact_no] = useState("")
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        axios
          .get("http://localhost:5175/employee/" + id)
          .then((result) => {
            const employee = result.data.employee;  
            setEmp_id(employee.emp_id);
            setName(employee.name);
            setNic(employee.nic);
            setEmail(employee.email);
            setAge(employee.age);
            setDivision(employee.division);
            setPosition(employee.position);
            setContact_no(employee.contact_no);
          })
          .catch((err) => console.log(err));
      }, [id]);

    const validateForm = () => {
        let isValid = true;
        let errors = {};
    
        // Employee ID Validation (4-10 letters and numbers only)
        const employeeIdRegex = /^[a-zA-Z0-9]{4,10}$/;
        if (!employeeIdRegex.test(emp_id)) {
          isValid = false;
          errors.emp_id = "Employee ID must be contain only 4-10 letters and numbers.";
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
    
        const employeeData = {
            emp_id,
            name,
            nic,
            email,
            age,
            division,
            position,
            contact_no
        }
    
        axios
          .put("http://localhost:5175/employee/" + id, employeeData)
          .then(() => {
            Swal.fire({
              title: "Updated",
              text: "Order details updated",
              icon: "success",
            }).then(() => {
              navigate("/admin/employee");
            });
          })
          .catch((err) => console.log(err));
      }; 

  return (
    <div>
        <div className="container bg-white rounded shadow-lg m-4 p-5 mt-5">
              <h2 className="text-center mb-4">Update Employee</h2>

              <form onSubmit={Update}>
                  <div className="row">
                      {/* Employee ID Field */}
                      <div className="form-group col-md-6 mb-3">
                          <label htmlFor="employee_id" className="form-label">Employee ID</label>
                          <input
                              type="text"
                              className="form-control"
                              id="employee_id"
                              placeholder="Enter Employee ID"
                              required
                              value={emp_id}
                              onChange={(e) => setEmp_id(e.target.value)}
                          />
                          {errors.emp_id && <p className="text-danger">{errors.emp_id}</p>}
                      </div>

                      {/* Name Field */}
                      <div className="form-group col-md-6 mb-3">
                          <label htmlFor="name" className="form-label">Name</label>
                          <input
                              type="text"
                              className="form-control"
                              id="name"
                              placeholder="Enter Full Name"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                          />
                          {errors.name && <p className="text-danger">{errors.name}</p>}
                      </div>
                  </div>

                  <div className="row">
                      {/* NIC Field */}
                      <div className="form-group col-md-6 mb-3">
                          <label htmlFor="nic" className="form-label">NIC</label>
                          <input
                              type="text"
                              className="form-control"
                              id="nic"
                              placeholder="Enter NIC"
                              required
                              value={nic}
                              onChange={(e) => setNic(e.target.value)}
                          />
                      </div>

                      {/* Email Field */}
                      <div className="form-group col-md-6 mb-3">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Enter Email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />
                          {errors.email && <p className="text-danger">{errors.email}</p>}
                      </div>
                  </div>

                  <div className="row">
                      {/* Age Field */}
                      <div className="form-group col-md-6 mb-3">
                          <label htmlFor="age" className="form-label">Age</label>
                          <input
                              type="number"
                              className="form-control"
                              id="age"
                              placeholder="Enter Age"
                              required
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                          />
                      </div>

                      {/* Division Field */}
                      <div className="form-group col-md-6 mb-3 position-relative">
                          <label htmlFor="division" className="form-label">Division</label>
                          <select
                              className="form-control"
                              id="division"
                              required
                              value={division}
                              onChange={(e) => setDivision(e.target.value)}
                              style={{ appearance: 'none', paddingRight: '40px' }}
                          >
                              <option value="" disabled selected>Select Division</option>
                              <option value="HR">HR</option>
                              <option value="Sales">Sales</option>
                              <option value="IT">IT</option>
                          </select>
                          <i className="fa fa-chevron-down position-absolute" style={{ top: '45px', right: '20px', pointerEvents: 'none' }}></i>
                      </div>
                  </div>

                  <div className="row">
                      {/* Position Field */}
                      <div className="form-group col-md-6 mb-3">
                          <label htmlFor="position" className="form-label">Position</label>
                          <input
                              type="text"
                              className="form-control"
                              id="position"
                              placeholder="Enter Position"
                              required
                              value={position}
                              onChange={(e) => setPosition(e.target.value)}
                          />
                      </div>

                      {/* Contact No Field */}
                      <div className="form-group col-md-6 mb-3">
                          <label htmlFor="contact_no" className="form-label">Contact No</label>
                          <input
                              type="tel"
                              className="form-control"
                              id="contact_no"
                              placeholder="Enter Contact Number"
                              required
                              value={contact_no}
                              onChange={(e) => setContact_no(e.target.value)}
                          />
                          {errors.contact_no && <p className="text-danger">{errors.contact_no}</p>}
                      </div>
                  </div>

                  {/* Submit Button */}
                  <div className="form-btn">
                      <button type="submit" className="btn btn-primary ">
                          Update Employee
                      </button>
                  </div>
              </form>
          </div>
    </div>
  )
}

export default UpdateEmployee