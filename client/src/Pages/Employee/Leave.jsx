import React from 'react'

function Leave() {
  return (
    <div>
        <div className="container bg-white rounded shadow m-4 p-4">
        <h1 className="mb-4">Leave Management</h1>


        {/* Leave Table */}
        <table className="table table-striped table-bordered table-hover text-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Leave ID</th>
              <th scope="col">Leave By</th>
              <th scope="col">Leave Date</th>
              <th scope="col">Days</th>
              <th scope="col">Reason</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td className="align-middle"></td>
              <td className="align-middle"></td>
              <td className="align-middle"></td>
              <td className="align-middle"></td>
              <td className="align-middle"></td>
              <td className="align-middle">
              <select className="form-control" defaultValue="Pending">
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              </td>
              <td className="align-middle">
                <button
                  className="btn btn-danger btn-sm"

                >
                  Delete
                </button>
              </td>
            </tr>

          </tbody>
        </table>

        
      </div>
    </div>
  )
}

export default Leave