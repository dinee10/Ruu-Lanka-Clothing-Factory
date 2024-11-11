import { Space } from 'antd'
import axios from 'axios'
import jsPDF from 'jspdf'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import SummaryCard from '../../Components/SummaryCard/SummaryCard'
import { ProductOutlined } from '@ant-design/icons'

function Employee() {
  const [employees, setEmployees] = useState([])
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5174/employee")
      .then(result => {
        if (result.data && result.data.employees) {
        setEmployees(result.data.employees)
        }

      })
      .catch(err => console.log(err));
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(query.toLowerCase())
  );
  
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
        axios.delete("http://localhost:5174/employee/" + id)
          .then(res => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: "Employee has been deleted.",
              icon: "success"
            }).then(() => {
              window.location.reload();
              setEmployees(employees.filter(employee => employee._id !== id));
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
    doc.text("Employee List", 14, 40);

    doc.setFontSize(12);
    doc.text("Updated employee list on " + new Date().toLocaleDateString(), 14, 50);

    // For simplicity, we'll add a placeholder image for now (you can customize this)
    const headers = [["Employee ID", "Name", "Email", "Division", "Contact No"]];

    const rows = filteredEmployees.map((employee) => [
      employee.emp_id,
      employee.name,
      employee.email,
      employee.division,
      employee.contact_no,
    ]);

    doc.autoTable({
      head: headers,
      body: rows,
      startY: 60,
     
    });

    doc.save("employee_report_" + new Date().toLocaleDateString() + ".pdf");
  };

  const hrCount = employees.filter(employee => employee.division === "HR").length;
  const salesCount = employees.filter(employee => employee.division === "Sales").length;
  const itCount = employees.filter(employee => employee.division === "IT").length;

  return (
    <>
    <Space style={{ padding: '20px '}} size={50} direction="horizontal">
      <SummaryCard icon={<ProductOutlined style={{ color: "green", fontSize: 30 }} />} title={"Total Employee"} value={employees.length}/>
      <SummaryCard icon={<ProductOutlined style={{ color: "black", fontSize: 30 }} />} title={"HR"} value={hrCount}/>
      <SummaryCard icon={<ProductOutlined style={{ color: "red", fontSize: 30 }} />} title={"Sales"} value={salesCount}/>
      <SummaryCard icon={<ProductOutlined style={{ color: "blue", fontSize: 30 }} />} title={"IT"} value={itCount}/>
    </Space>
    <div>
      <button className='btn btn-primary m-4 px-4' onClick={() => navigate('/admin/employeesalary')}>Salary Generate</button>
      <button className='btn btn-primary m-4 px-4' onClick={() => navigate('/admin/employeeleave')}>Leave Manage</button>

      <div className="container bg-white rounded shadow m-4 p-4">
        <h1 className="mb-4">Employee List</h1>

        {/* Search Bar and Add Button */}
        <div className="row mb-4">
          <div className="col-md-4">
            {/* Search bar width */}
            <div className="input-group">
              <input
                type="search"
                placeholder="Search Employees..."
                className="form-control"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-7 text-right">
            {/* Right-align the button */}
            <button className="btn btn-primary" onClick={() => navigate('/admin/employeecreate')}>
              Add Employee
            </button>
          </div>
        </div>

        {/* Product Table */}
        <table className="table table-striped table-bordered table-hover text-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Employee ID</th>
              <th scope="col">Name</th>
              <th scope="col">Division</th>
              <th scope="col">Position</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (            
              <tr key={employee._id}>
              <td className="align-middle">{employee.emp_id}</td>
              <td className="align-middle">{employee.name}</td>
              <td className="align-middle">{employee.division}</td>
              <td className="align-middle">{employee.position}</td>
              <td className="align-middle">
                <button
                  className="btn btn-info btn-sm mr-2"
                  onClick={() => navigate(`/admin/employeeview/${employee._id}`)}
                >
                  View
                </button>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => navigate(`/admin/employeeupdate/${employee._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(employee._id)}
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
    </>
  )
}

export default Employee