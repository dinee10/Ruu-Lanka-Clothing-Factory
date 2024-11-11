import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [contact_no, setContact_no] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 

    // Function to handle form submission
    const handleSignup = async (e) => {
        e.preventDefault();
        
        try {
            // Send POST request to register route
            const response = await axios.post('http://localhost:5174/users/register', {
                name,
                country,
                contact_no,
                email,
                password,
            });

            // If registration is successful
            if (response.status === 201) {
                alert('Registration successful!');
                navigate('/login'); // Redirect to login page after signup
            }
        } catch (error) {
            setError(error.response.data.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <Nav />
            <div className="container-fluid">
                <div className="row p-5 justify-content-center align-items-center bg-dark">
                    <div className="col-md-6 col-lg-4">
                        <div className="card bg-dark-subtle border-0 d-flex flex-column" style={{ minHeight: "500px" }}>
                            <div className="card-body p-4 d-flex flex-column justify-content-between">
                                <h2 className="text-center mb-4">Sign Up</h2>
                                
                                {/* Display error message if signup fails */}
                                {error && <div className="alert alert-danger">{error}</div>}

                                <form className="flex-grow-2" onSubmit={handleSignup}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="country" className="form-label">Country</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="country"
                                            placeholder="Enter your country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="contact_no" className="form-label">Contact No</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="contact_no"
                                            placeholder="Enter your contact_no"
                                            value={contact_no}
                                            onChange={(e) => setContact_no(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-info w-100">
                                        Sign Up
                                    </button>
                                </form>
                                <div className="text-center mt-3">
                                    <small>
                                        Already have an account? <Link to="/login" className="text-info">Sign in</Link>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Signup;
