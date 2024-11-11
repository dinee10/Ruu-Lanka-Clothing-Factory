import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateInventory() {
    const { id } = useParams();
    const [suppliers, setSuppliers] = useState([])
    const [order_id, setOrder_id] = useState("")
    const [material, setMaterial] = useState("")
    const [qty, setQty] = useState("")
    const [supplier_id, setSupplier_id] = useState("")
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get("http://localhost:5174/supplier");
                setSuppliers(response.data.suppliers || []);
            } catch (err) {
                console.error("Failed to fetch suppliers:", err);
                Swal.fire("Error", "Failed to fetch suppliers", "error");
            }
        };
    
        axios
          .get("http://localhost:5174/inventory/" + id)
          .then((result) => {
            const inventory = result.data.inventory;  
            setOrder_id(inventory.order_id);
            setMaterial(inventory.material);
            setQty(inventory.qty);
            setSupplier_id(inventory.supplier_id);
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error", "Failed to fetch inventory details", "error");
          });
    
        fetchSupplier();
    }, []);
    

    const validateForm = () => {
        let isValid = true;
        let errors = {};
    
        // Order ID Validation (4-10 letters and numbers only)
        const orderIdRegex = /^[a-zA-Z0-9]{4,10}$/;
        if (!orderIdRegex.test(order_id)) {
          isValid = false;
          errors.order_id = "Order ID must be contain only 4-10 letters and numbers.";
        }
    
        // Material Validation (letters and spaces only)
        const materialRegex = /^[a-zA-Z\s]+$/;
        if (!materialRegex.test(material)) {
          isValid = false;
          errors.material = "Name should only contain letters and spaces.";
        } 

        if (qty <= 0) {
            isValid = false;
            errors.qty = "Quantity must be greater than zero.";
        }
    
        setErrors(errors);
        return isValid;
    };

    const Update = (e) => {
        e.preventDefault();
    
        // if (!validateForm()) {
        //    return;
        // }
    
        const inventoryData = {
            order_id,
            material,
            qty,
            supplier_id
        }
    
        axios
          .put("http://localhost:5174/inventory/" + id, inventoryData)
          .then(() => {
            Swal.fire({
              title: "Updated",
              text: "Inventory details updated",
              icon: "success",
            }).then(() => {
              navigate("/admin/inventory");
            });
          })
          .catch((err) => console.log(err));
      };
  return (
    <div>
        <div className="container bg-white rounded shadow m-4 p-4 mt-5">
                <h2 className="mb-4">Update Inventory</h2>

                <form onSubmit={Update}>
                    
                    <div className="form-group mb-3">
                        <label htmlFor="order_id" className="form-label">
                            Order ID
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="order_id"
                            name='order_id'
                            required
                            value={order_id}
                            onChange={(e) => setOrder_id(e.target.value)}
                        />
                        {errors.order_id && <p className="text-danger">{errors.order_id}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="material" className="form-label">
                            Material
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="material"
                            name='material'
                            required
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                        />
                        {errors.material && <p className="text-danger">{errors.material}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="qty" className="form-label">
                            Quantity
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="qty"
                            name='qty'
                            required
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                        />
                        {errors.qty && <p className="text-danger">{errors.qty}</p>}
                    </div>

                    
                    <div className="form-group mb-3 position-relative">
                        <label htmlFor="supplier_id" className="form-label">
                            Supplier ID
                        </label>
                        <select
                        id="supplier_id"
                        name="supplier_id"
                        className="form-control"
                        required
                        value={supplier_id}
                        onChange={(e) => setSupplier_id(e.target.value)}
                    >
                        <option value="" disabled>Select Supplier</option>
                        {suppliers.map((suppliers) => (
                            <option key={suppliers._id} value={suppliers._id}>
                                {suppliers.supplier_id}
                            </option>
                        ))}
                    </select>
                    <i className="fa fa-chevron-down position-absolute" style={{ top: '45px', right: '10px', pointerEvents: 'none' }}></i> {/* Font Awesome icon */}
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

export default UpdateInventory