import React from 'react'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom'

function Myorder() {
    const navigate = useNavigate()

  return (
      <div>
          <Nav />
          <div className='container-fluid bg-dark d-flex justify-content-center align-items-center'
              style={{ minHeight: "500px" }}>
              <div className="col-md-4">
                  <div className="card p-4 shadow-lg border-0 rounded-4">
                      <h4 className="text-center mb-2">My Order</h4>
                      <hr />
                      <div className="d-flex justify-content-between mb-3">
                          <h5 className="text-muted">Your order has been received.</h5>
                      </div>
                      <button
                          className="btn btn-info w-25 rounded-3"
                          onClick={() => navigate('/')}
                      >
                          Home
                      </button>
                  </div>
              </div>
          </div>
          <Footer />
      </div>

  )
}

export default Myorder