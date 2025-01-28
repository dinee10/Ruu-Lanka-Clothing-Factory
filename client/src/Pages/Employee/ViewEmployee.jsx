import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ViewEmployee() {

    const { id } = useParams()
    const [employee, setEmployee] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch the product details including the image URL
        axios
            .get(`http://localhost:5175/employee/${id}`)
            .then((result) => {
                setEmployee(result.data.employee); // Set the fetched product data
            })
            .catch((err) => console.log(err));
    }, [id]);

    if (!employee) return <div>Loading...</div>;

  return (
      <div>
          <div className="container col-md-4 bg-white rounded shadow-lg m-4 p-5 mt-5">
              <h3 className="text-center fw-bold mb-5">{employee.name}</h3>


              <div className='row '>
                  <p className='fw-bold'>Employee ID: {employee.emp_id}</p>
                  <p className='fw-bold'>Name: {employee.name}</p>
                  <p className='fw-bold'>NIC: {employee.nic}</p>
                  <p className='fw-bold'>Email: {employee.email}</p>
                  <p className='fw-bold'>Age: {employee.age}</p>
                  <p className='fw-bold'>Division: {employee.division}</p>
                  <p className='fw-bold'>Position: {employee.position}</p>
                  <p className='fw-bold'>Contact No: {employee.contact_no}</p>
              </div>

              {/* Submit Button */}
              <div className="form-btn mt-3">
                  <button type="submit" className="btn btn-primary " onClick={() => navigate('/admin/employee')}>
                      Back
                  </button>
              </div>

          </div>
      </div>
  )
}

export default ViewEmployee