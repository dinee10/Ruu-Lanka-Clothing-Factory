import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function User() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5175/users")
      .then(result => {
        console.log(result.data); // Check the response structure here
        setUsers(result.data.users);
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
        axios.delete("http://localhost:5175/users/" + id)
          .then(res => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: "Customer has been deleted.",
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
    doc.text("Users Details", 14, 40);

    doc.setFontSize(12);
    doc.text("Updated details list on " + new Date().toLocaleDateString(), 14, 50);

    // For simplicity, we'll add a placeholder image for now (you can customize this)
    const headers = [["Name", "Email", "Shipping Address", "Contact No"]];

    const rows = filteredUsers.map((user) => [
      user.name,
      user.country,
      user.contact_no,
      user.email,
    ]);

    doc.autoTable({
      head: headers,
      body: rows,
      startY: 60,
     
    });

    doc.save("customer_details_report_" + new Date().toLocaleDateString() + ".pdf");
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase()) 
  );

  return (
    <div>
      <div className="container bg-white rounded shadow m-4 p-4 mt-5">
      <h1 className="mb-4">User Account Details</h1>

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
            <th scope="col">Country</th>
            <th scope="col">Contact No</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((users) => (
            <tr key={users._id}>
              <td className="align-middle">{users.name}</td>
              <td className="align-middle">{users.country}</td>
              <td className="align-middle">{users.contact_no}</td>
              <td className="align-middle">{users.email}</td>
              <td className="align-middle">
                <button
                  className="btn btn-info btn-sm mr-2"
                  onClick={() => navigate(`/admin/userview/${users._id}`)}
                >
                  View
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(users._id)}
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
    </div>
  )
}

export default User