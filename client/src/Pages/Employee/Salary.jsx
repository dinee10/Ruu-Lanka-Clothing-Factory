import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

function Salary() {
    const [employees, setEmployees] = useState([])
    const [salaries, setSalaries] = useState([])
    const [name, setName] = useState(""); // Define state for name
    const [division, setDivision] = useState(""); 
    const [attendance, setAttendance] = useState(""); 
    const [salaryPerDay, setSalaryPerDay] = useState(""); 

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get("http://localhost:5175/employee");
                setEmployees(response.data.employees || []);
            } catch (err) {
                console.error("Failed to fetch emploees:", err);
            }
        };

        axios.get("http://localhost:5175/salary")
            .then(result => setSalaries(result.data.salaries))
            .catch(err => console.log(err));

        fetchEmployee();
    }, []);

    const Submit = (e) => {
        e.preventDefault();

        // if (!validateForm()) {
        //     return;
        // }
    
        const salaryData = {
            name,
            division,
            attendance,
            salaryPerDay
        }
    
        axios
          .post("http://localhost:5174/salary", salaryData)
          .then(() => {
            Swal.fire({
              title: "Successful",
              text: "Salary added to the list successfully",
              icon: "success",
            }).then(() => window.location.reload());
          })
          .catch((err) => console.log(err));
      };

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
            axios.delete("http://localhost:5174/salary/" + id)
              .then(res => {
                console.log(res);
                Swal.fire({
                  title: "Deleted!",
                  text: "Salary has been deleted.",
                  icon: "success"
                }).then(() => {
                  window.location.reload();
                });
              })
              .catch(err => console.log(err));
          }
        });
      };

  return (
    <div>
        <div className="container  bg-white rounded shadow m-4 p-4">
        <h1 className="mb-4">Salary Generator</h1>

        <div className='d-1 rounded shadow m-4 p-3'>
            <form onSubmit={Submit}>
                <div className='form-group mb-3'>
                    <label htmlFor="name" className='form-label'>Name</label>
                    <select className='form-control' id='name' name='name' required value={name} onChange={(e) => setName(e.target.value)}>
                        <option value="" disabled>Select Employee</option>
                        {employees.map((employees) => (
                            <option key={employees._id} value={employees._id}>{employees.name}</option>
                        ))}
                    </select>
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor="division">Department</label>
                    <select className='form-control' id='division' name='division' required value={division} onChange={(e) => setDivision(e.target.value)}>
                        <option value="" disabled>Select Department</option>
                        <option value="HR">HR</option>
                        <option value="Sales">Sales</option>
                        <option value="IT">IT</option>
                    </select>
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor="attendance">Attendance</label>
                    <input type="number" className='form-control' id='attendance' name="attendance" required value={attendance} onChange={(e) => setAttendance(e.target.value)}/>
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor="salaryPerDay">Salary Per Day</label>
                    <input type="number" className='form-control' id='salaryPerDay' name="salaryPerDay" required value={salaryPerDay} onChange={(e) => setSalaryPerDay(e.target.value)}/>
                </div>
                <div className='form-btn'>
                    <button type='submit' className='btn btn-primary'>Generate</button>
                </div>
            </form>
        </div>

        {/* Salary Table */}
        <div >
        <table className="table table-striped table-bordered table-hover text-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              <th scope="col">Attendance</th>
              <th scope="col">Salary Per Day</th>
              <th scope="col">Salary</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((salary) => (
              <tr key={salary._id}>
              <td className="align-middle">{salary.name.name}</td>
              <td className="align-middle">{salary.division}</td>
              <td className="align-middle">{salary.attendance}</td>
              <td className="align-middle">{salary.salaryPerDay}</td>
              <td className="align-middle">{salary.attendance*salary.salaryPerDay}</td>
              <td className="align-middle">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(salary._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>
    </div>
  )
}

export default Salary