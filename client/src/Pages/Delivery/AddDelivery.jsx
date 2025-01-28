import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function AddDelivery() {
    const [inputs, setInputs] = useState({
        name: '',
        status: '',
        assignedAt: '',
        driverId: '',
        orderid: ''
    });

    const [drivers, setDrivers] = useState([])
    const [orders, setOrders] = useState([])
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get("http://localhost:5175/driver");
                setDrivers(response.data.drivers || []);
            } catch (err) {
                console.error("Failed to fetch drivers:", err);
            }
        };
        
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:5175/order");
                setOrders(response.data.orders || []);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            }
        };

        fetchDrivers();
        fetchOrders();
    }, []);

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};
        
        if (!/^[A-Z][a-zA-Z0-9]*\d+/.test(inputs.name)) {
            formIsValid = false;
            newErrors.name = "Name must start with a capital letter and include at least one number";
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const Submit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await axios.post("http://localhost:5175/delivery", {
                ...inputs,
                assignedAt: new Date(inputs.assignedAt)
            });
            Swal.fire({
                title: "Successful",
                text: "Delivery added successfully",
                icon: "success"
            }).then(() => navigate("/admin/delivery"));
        } catch (err) {
            console.error("Failed to add delivery:", err);
        }
    };

  return (
        <div>
            <div className="container bg-white rounded shadow m-4 p-4 mt-5">
                <h2 className="mb-4">Add Delivery</h2>

                <form onSubmit={Submit}>
                    {/* Name Field */}
                    <div className="form-group mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name='name'
                            required
                            onChange={handleChange}
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>

                    {/* Status Field */}
                    <div className="form-group mb-3 position-relative">
                        <label htmlFor="status" className="form-label">
                            Status
                        </label>
                        <select
                            className="form-control"
                            id="status"
                            name='status'
                            required
                            
                            onChange={handleChange}
                            style={{ appearance: 'none', paddingRight: '40px' }}
                        >
                            <option value="" disabled selected>Select Status</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                        <i className="fa fa-chevron-down position-absolute" style={{ top: '45px', right: '10px', pointerEvents: 'none' }}></i> {/* Font Awesome icon */}
                    </div>

                    {/* Assigned At Field */}
                    <div className="form-group mb-3">
                        <label htmlFor="assignedAt" className="form-label">
                            Assigned At
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="assignedAt"
                            name='assignedAt'
                            required
                            
                            onChange={handleChange}
                        />
                    </div>

                    {/* Driver Field */}
                    <div className="form-group mb-3 position-relative">
                        <label htmlFor="driverId" className="form-label">
                            Driver ID
                        </label>
                        <select
                        id="driverId"
                        name="driverId"
                        className="form-control"
                        
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled selected>Select Driver</option>
                        {drivers.map((driver) => (
                            <option key={driver._id} value={driver._id}>
                                {driver.name}
                            </option>
                        ))}
                    </select>
                    <i className="fa fa-chevron-down position-absolute" style={{ top: '45px', right: '10px', pointerEvents: 'none' }}></i> {/* Font Awesome icon */}
                    </div>

                    {/* Order Field */}
                    <div className="form-group mb-3 position-relative">
                        <label htmlFor="orderid" className="form-label">
                            Order ID
                        </label>
                        <select
                        id="orderid"
                        name="orderid"
                        className="form-control"
                        
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled selected>Select Order</option>
                        {orders.map((order) => (
                            <option key={order._id} value={order._id}>
                                {order.order_id}
                            </option>
                        ))}
                    </select>
                    <i className="fa fa-chevron-down position-absolute" style={{ top: '45px', right: '10px', pointerEvents: 'none' }}></i> {/* Font Awesome icon */}
                    </div>

                    {/* Submit Button */}
                    <div className="form-btn">
                        <button type="submit" className="btn btn-primary">
                            Add Delivery
                        </button>
                    </div>
                </form>
            </div>
        </div>
    
  )
}

export default AddDelivery