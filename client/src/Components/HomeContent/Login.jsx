import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to handle error messages

    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Send POST request to login route
            const response = await axios.post('http://localhost:5174/users/login', {
                email,
                password,
            });

            // If login is successful
            if (response.status === 200) {
                const { token } = response.data; // Assuming JWT token is sent in response
                localStorage.setItem('authToken', token); // Store token in localStorage (or use cookies)

                alert('Login successful!');
                navigate('/admin'); // Redirect to admin dashboard after login
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            <Nav />
            <div className="container-fluid">
                <div className="row p-5 justify-content-center align-items-center bg-dark">
                    <div className="col-md-6 col-lg-4">
                        <div className="card border-0 bg-dark-subtle d-flex flex-column" style={{ minHeight: "500px" }}>
                            <div className="card-body p-4 d-flex flex-column justify-content-between">
                                <h2 className="text-center mb-4">Login</h2>

                                {/* Display error message if login fails */}
                                {error && <div className="alert alert-danger">{error}</div>}

                                <form className="flex-grow-2" onSubmit={handleLogin}>
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
                                        Login
                                    </button>
                                </form>
                                <div className="text-center mt-3">
                                    <small>
                                        Don't have an account? <Link to="/signup" className="text-info">Sign up</Link>
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

export default Login;
