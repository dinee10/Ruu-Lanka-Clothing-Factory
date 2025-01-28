import { MailOutlined } from '@ant-design/icons'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Feedback() {
  const [feedback, setFeedback] = useState([])
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5175/feedback")
      .then(result => setFeedback(result.data.feedback))
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
        axios.delete("http://localhost:5174/feedback/" + id)
          .then(res => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: "Customer Feedback has been deleted.",
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
    doc.text("Customer Feedback", 14, 40);

    doc.setFontSize(12);
    doc.text("Updated feedback list on " + new Date().toLocaleDateString(), 14, 50);

    // For simplicity, we'll add a placeholder image for now (you can customize this)
    const headers = [["Email", "Title", "Message"]];

    const rows = filteredFeedback.map((feedback) => [
      feedback.email,
      feedback.title,
      feedback.message,
    ]);

    doc.autoTable({
      head: headers,
      body: rows,
      startY: 60,
     
    });

    doc.save("feedback_details_report_" + new Date().toLocaleDateString() + ".pdf");
  };

  const filteredFeedback = feedback.filter(feedback =>
    feedback.email?.toLowerCase().includes(query.toLowerCase()) ||
    feedback.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="container bg-white rounded shadow m-4 p-4">
        <h1 className="mb-4">Feedback List</h1>

        {/* Search Bar and Add Button */}
        <div className="row mb-4">
          <div className="col-md-4">
            {/* Search bar width */}
            <div className="input-group">
              <input
                type="search"
                placeholder="Search ..."
                className="form-control"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-7 text-right">
            {/* Right-align the button */}
            <button className="btn btn-primary" >
              Add Employee
            </button>
          </div>
        </div>

        {/* Product Table */}
        <table className="table table-striped table-bordered table-hover text-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Title</th>
              <th scope="col">Message</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedback.map((feedback) => (
              <tr key={feedback._id}>
              <td className="align-middle">{feedback.email}</td>
              <td className="align-middle">{feedback.title}</td>
              <td className="align-middle">{feedback.message}</td>
              <td className="align-middle">
              <select className="form-control" defaultValue="Not Responded">
                <option value="Not Responded">Not Responded</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              </td>
              <td className="align-middle">
                <button
                  className="btn btn-danger btn-sm mr-2"
                  onClick={() => handleDelete(feedback._id)}
                >
                  Delete
                </button>
                <button className='btn btn-info btn-sm'>
                  <MailOutlined />
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

export default Feedback