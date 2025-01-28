import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ViewUser() {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch the product details including the image URL
        axios
            .get(`http://localhost:5175/users/${id}`)
            .then((result) => {
                setUser(result.data.user); // Set the fetched product data
            })
            .catch((err) => console.log(err));
    }, [id]);

    if (!user) return <div>Loading...</div>;

  return (
    <div>
        <div>
          <div className="container col-md-6 bg-white rounded shadow-lg m-4 p-5 mt-5">
              <h3 className="text-center fw-bold mb-5">{user.name}</h3>


              <div className='row '>
                  <p className='fw-bold'>Name: {user.name}</p>
                  <p className='fw-bold'>Country: {user.country}</p>
                  <p className='fw-bold'>Contact No: {user.contact_no}</p>
                  <p className='fw-bold'>Email: {user.email}</p>
              </div>

              {/* Submit Button */}
              <div className="form-btn mt-3">
                  <button type="submit" className="btn btn-primary " onClick={() => navigate('/admin/user')}>
                      Back
                  </button>
              </div>

          </div>
      </div>
    </div>
  )
}

export default ViewUser

