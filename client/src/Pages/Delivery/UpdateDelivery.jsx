import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateDelivery() {
    const { id } = useParams();
    const [status, setStatus] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5175/delivery/${id}`)
            .then(result => {
                setStatus(result.data.deliveries.status);
                setUpdatedAt(result.data.deliveries.updatedAt);
            })
            .catch(err => console.log(err));
    }, [id]);

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};

        // Validate status: check if not empty
        if (!status) {
            formIsValid = false;
            newErrors.status = "Status is required";
        }

        // Validate updatedAt: check if not empty
        if (!updatedAt) {
            formIsValid = false;
            newErrors.updatedAt = "Updated date is required";
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const Update = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const deliveryData = {
            status,
            updatedAt
        };

        axios.put(`http://localhost:5175/delivery/${id}`, deliveryData)
            .then(() => {
                Swal.fire({
                    title: "Successful",
                    text: "Delivery updated successfully",
                    icon: "success"
                }).then(() => navigate('/admin/delivery')); // Change this route to your delivery list page
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="container bg-white rounded shadow m-4 p-4 mt-5">
                <h2 className="mb-4">Update Delivery</h2>

                <form onSubmit={Update}>
                    {/* Status Field */}
                    <div className="form-group mb-3 position-relative">
                        <label htmlFor="status" className="form-label">
                            Status
                        </label>
                        <select
                            className="form-control"
                            id="status"
                            name="status"
                            required
                            onChange={(e) => setStatus(e.target.value)}
                            style={{ appearance: 'none', paddingRight: '40px' }}
                        >
                            <option value="" disabled selected>Select Status</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Failed">Failed</option>
                        </select>
                        <i className="fa fa-chevron-down position-absolute" style={{ top: '45px', right: '10px', pointerEvents: 'none' }}></i> {/* Font Awesome icon */}
                        {errors.status && <span className="text-danger">{errors.status}</span>}
                    </div>

                    {/* Updated Date Field */}
                    <div className="form-group mb-3">
                        <label htmlFor="updatedAt" className="form-label">
                            Updated At
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="updatedAt"
                            name='updatedAt'
                            required
                            onChange={(e) => setUpdatedAt(e.target.value)}
                        />
                        {errors.updatedAt && <span className="text-danger">{errors.updatedAt}</span>}
                    </div>



                    {/* Submit Button */}
                    <div className="form-btn">
                        <button type="submit" className="btn btn-primary">
                            Update Delivery
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateDelivery