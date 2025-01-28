import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import Swal from 'sweetalert2';

function Supplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5175/supplier")
      .then(result => {
        if (result.data && result.data.suppliers) {
        setSuppliers(result.data.suppliers)
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
        axios.delete("http://localhost:5175/supplier/" + id)
          .then(res => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: "Supplier has been deleted.",
              icon: "success"
            }).then(() => {
              window.location.reload();
              setSuppliers(suppliers.filter(supplier => supplier._id !== id));
            });
          })
          .catch(err => console.log(err));
      }
    });
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(query.toLowerCase())
  );

  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("RUU Lanka Handlooms Clothing Factory (PVT) LTD", 105, 20, { align: "center" });

    doc.setFontSize(16);
    doc.text("Supplier List", 14, 40);

    doc.setFontSize(12);
    doc.text("Updated supplier list on " + new Date().toLocaleDateString(), 14, 50);

    // For simplicity, we'll add a placeholder image for now (you can customize this)
    const headers = [["Supplier ID", "Name", "Email", "Item", "Contact No"]];

    const rows = filteredSuppliers.map((supplier) => [
      supplier.supplier_id,
      supplier.name,
      supplier.email,
      supplier.item,
      supplier.contact_no,
    ]);

    doc.autoTable({
      head: headers,
      body: rows,
      startY: 60,
     
    });

    doc.save("supplier_details_report_" + new Date().toLocaleDateString() + ".pdf");
  };

  return (
    <div>
      <div className="container bg-white rounded shadow m-4 p-4 mt-5">
      <h1 className="mb-4">Supplier List</h1>

      {/* Search Bar and Add Button */}
      <div className="row mb-4">
        <div className="col-md-4">
          {/* Search bar width */}
          <div className="input-group">
            <input
              type="search"
              placeholder="Search Suppliers..."
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-7 text-right">
          {/* Right-align the button */}
          <button className="btn btn-primary" onClick={() => navigate('/admin/suppliercreate')}>
            Add Supplier
          </button>
        </div>
      </div>

      {/* Product Table */}
      <table className="table table-striped table-bordered table-hover text-center">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Supplier ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Supply Item</th>
            <th scope="col">Contact No</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td className="align-middle">{supplier.supplier_id}</td>
              <td className="align-middle">{supplier.name}</td>
              <td className="align-middle">{supplier.email}</td>
              <td className="align-middle">{supplier.item}</td>
              <td className="align-middle">{supplier.contact_no}</td>
              <td className="align-middle">
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => navigate(`/admin/supplierupdate/${supplier._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(supplier._id)}
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

export default Supplier