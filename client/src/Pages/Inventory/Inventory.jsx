import axios from 'axios';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Inventory() {

  const [inventories, setInventories] = useState([])
  const [query, setQuery] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5175/inventory")
      .then(result => {
        if (result.data && result.data.inventories) {
        setInventories(result.data.inventories)
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:5175/inventory/" + id)
          .then(res => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: "Inventory has been deleted.",
              icon: "success"
            }).then(() => {
              window.location.reload();
            });
          })
          .catch(err => console.log(err));
      }
    });
  };

  const filteredInventories = inventories.filter(inventory =>
    inventory.material.toLowerCase().includes(query.toLowerCase())
  );

  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("RUU Lanka Handlooms Clothing Factory (PVT) LTD", 105, 20, { align: "center" });

    doc.setFontSize(16);
    doc.text("Inventory List", 14, 40);

    doc.setFontSize(12);
    doc.text("Updated inventory list on " + new Date().toLocaleDateString(), 14, 50);

    // For simplicity, we'll add a placeholder image for now (you can customize this)
    const headers = [["Order ID", "Material", "Qty", "Supplier ID"]];

    const rows = filteredInventories.map((inventory) => [
      inventory.order_id,
      inventory.material,
      inventory.qty,
      inventory.supplier_id.supplier_id,
    ]);

    doc.autoTable({
      head: headers,
      body: rows,
      startY: 60,
     
    });

    doc.save("inventory_details_report_" + new Date().toLocaleDateString() + ".pdf");
  };


  return (
    <div>
      <div className="container bg-white rounded shadow m-4 p-4 mt-5">
      <h1 className="mb-4">Inventory List</h1>

      {/* Search Bar and Add Button */}
      <div className="row mb-4">
        <div className="col-md-4">
          {/* Search bar width */}
          <div className="input-group">
            <input
              type="search"
              placeholder="Search inventory..."
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-7 text-right">
          {/* Right-align the button */}
          <button className="btn btn-primary" onClick={() => navigate('/admin/inventorycreate')}>
            Add Inventory
          </button>
        </div>
      </div>

      {/* Product Table */}
      <table className="table table-striped table-bordered table-hover text-center">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Material</th>
            <th scope="col">Quantity</th>
            <th scope="col">Supplier ID</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventories.map((inventory) => (
            <tr key={inventory._id}>
              <td className="align-middle">{inventory.order_id}</td>
              <td className="align-middle">{inventory.material}</td>
              <td className="align-middle">{inventory.qty}</td>
              <td className="align-middle">{inventory.supplier_id.supplier_id}</td>
              <td className="align-middle">
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => navigate(`/admin/inventoryupdate/${inventory._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(inventory._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Generate Report Button */}
      <div className="text-left">
        <button className="btn btn-success" onClick={generatePDF}>
          Generate Report
        </button>
      </div>
    </div>
    </div>
  )
}

export default Inventory