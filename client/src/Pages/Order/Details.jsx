import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DeleteOutlined } from '@ant-design/icons';

function Details() {
  const [details, setDetails] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5175/detail")
      .then(result => setDetails(result.data.details))
      .catch(err => console.log(err));
  }, []);

  const navigate = useNavigate();

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
        axios.delete("http://localhost:5175/detail/" + id)
          .then(res => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: "Customer details has been deleted.",
              icon: "success"
            }).then(() => {
              window.location.reload();
            });
          })
          .catch(err => console.log(err));
      }
    });
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("RUU Lanka Handlooms Clothing Factory (PVT) LTD", 105, 20, { align: "center" });

    doc.setFontSize(16);
    doc.text("Customer Delivery Details", 14, 40);

    doc.setFontSize(12);
    doc.text("Updated details list on " + new Date().toLocaleDateString(), 14, 50);

    // For simplicity, we'll add a placeholder image for now (you can customize this)
    const headers = [["Name", "Email", "Shipping Address", "Contact No"]];

    const rows = filteredDetails.map((detail) => [
      detail.name,
      detail.email,
      detail.shipping_address,
      detail.contact_number,
    ]);

    doc.autoTable({
      head: headers,
      body: rows,
      startY: 60,
     
    });

    doc.save("customer_delivery_details_report_" + new Date().toLocaleDateString() + ".pdf");
  };

  const filteredDetails = details.filter(detail =>
    detail.name.toLowerCase().includes(query.toLowerCase()) ||
    detail.email.toLowerCase().includes(query.toLowerCase()) ||
    detail.shipping_address.toLowerCase().includes(query.toLowerCase()) ||
    detail.contact_number.toLowerCase().includes(query.toLowerCase()) 
  );

  return (
    <div className="container bg-white rounded shadow m-4 p-4 mt-5">
      <h1 className="mb-4">Customer Delivery Details</h1>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-4">
          {/* Search bar width */}
          <div className="input-group">
            <input
              type="search"
              placeholder="Search Orders..."
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Details Table */}
      <table className="table table-striped table-bordered table-hover text-center">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Shipping Address</th>
            <th scope="col">Contact No</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDetails.map((details) => (
            <tr key={details._id}>
              <td className="align-middle">{details.name}</td>
              <td className="align-middle">{details.email}</td>
              <td className="align-middle">{details.shipping_address}</td>
              <td className="align-middle">{details.contact_number}</td>
              <td className="align-middle">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(details._id)}
                >
                  <DeleteOutlined />
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
  )
}

export default Details