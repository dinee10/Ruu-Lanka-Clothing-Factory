import { Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import SummaryCard from '../../Components/SummaryCard/SummaryCard';
import { ProductOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import "jspdf-autotable";

function Delivery() {
  const navigate = useNavigate()
  const [deliveries, setDeliveries] = useState([])
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5175/delivery")
        .then(result => setDeliveries(result.data.deliveries))
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
        axios.delete("http://localhost:5175/delivery/" + id)
          .then(res => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: "The delivery has been deleted.",
              icon: "success"
            }).then(() => {
              window.location.reload();
              setDeliveries(deliveries.filter(delivery => delivery._id !== id));
            });
          })
          .catch(err => console.log(err));
      }
    });
  };

  const filteredDelivery = deliveries.filter(delivery =>
    delivery.name?.toLowerCase().includes(query.toLowerCase()) || 
    delivery.orderid?.order_id?.toLowerCase().includes(query.toLowerCase()) ||
    delivery.status?.toLowerCase().includes(query.toLowerCase())  // Search by status
);


  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("RUU Lanka Handlooms Clothing Factory (PVT) LTD", 105, 20, { align: 'center' });

    doc.setFontSize(16);
    doc.text("Delivery List", 14, 40);

    doc.setFontSize(12);
    doc.text("Updated delivery list on " + new Date().toLocaleDateString(), 14, 50);

    const headers = [
        ["Name", "Status", "Assigned At", "Updated At", "Driver Name", "Order ID"],
    ];

    const rows = filteredDelivery.map((delivery) => [
        delivery.name,
        delivery.status,
        delivery.assignedAt,
        new Date(delivery.updatedAt).toLocaleString(),
        delivery.driverId?.name || 'Not Assigned', // Display driver name or 'Not Assigned'
        delivery.orderid?.order_id || 'No Order',
        delivery.orderid?.name || 'N/A',
        delivery.orderid?.shipping_address || 'N/A',
        delivery.orderid?.contact_number || 'N/A' // Display order ID or 'No Order'
    ]);

    doc.autoTable({
        head: headers,
        body: rows,
        startY: 60
    });

    doc.save("delivery_report_" + new Date().toLocaleDateString() + ".pdf");
};

  const outDeliveryCount = deliveries.filter(delivery => delivery.status === "Out for Delivery").length;
  const assignedCount = deliveries.filter(delivery => delivery.status === "Assigned").length;
  const deliveredCount = deliveries.filter(delivery => delivery.status === "Delivered").length;

  return (
    <>
    <Space style={{ padding: '20px '}} size={50} direction="horizontal">
      <SummaryCard icon={<ProductOutlined style={{ color: "green", fontSize: 30 }} />} title={"Total Deliveries"} value={deliveries.length}/>
      <SummaryCard icon={<ProductOutlined style={{ color: "black", fontSize: 30 }} />} title={"Out for Delivery"} value={outDeliveryCount}/>
      <SummaryCard icon={<ProductOutlined style={{ color: "red", fontSize: 30 }} />} title={"Assigned"} value={assignedCount}/>
      <SummaryCard icon={<ProductOutlined style={{ color: "blue", fontSize: 30 }} />} title={"Delivered"} value={deliveredCount}/>
    </Space>
    <div className="container bg-white rounded shadow m-4 p-4 ">
      <h1 className="mb-4">Delivery List</h1>

      {/* Search Bar and Add Button */}
      <div className="row mb-4">
        <div className="col-md-4">
          {/* Search bar width */}
          <div className="input-group">
            <input
              type="search"
              placeholder="Search deliveries..."
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-7 text-right">
          {/* Right-align the button */}
          <button className="btn btn-primary" onClick={() => navigate('/admin/deliverycreate')}>
            Add Delivery
          </button>
        </div>
      </div>

      {/* Delivery Table */}
      <table className="table table-striped table-bordered table-hover text-center">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Assigned At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Driver</th>
            <th scope="col">Order ID</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Shipping Address</th>
            <th scope="col">Contact No</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDelivery.map((delivery) => (
            <tr key={delivery._id}>
              <td className="align-middle">{delivery.name}</td>
              <td className="align-middle">{delivery.status}</td>
              <td className="align-middle">{new Date(delivery.assignedAt).toLocaleDateString()}</td>
              <td className="align-middle">{new Date(delivery.updatedAt).toLocaleDateString()}</td>
              <td className='align-middle'>{delivery.driverId?.name || 'Not Assigned'}</td>
              <td className='align-middle'>{delivery.orderid?.order_id || 'No Order'}</td>
              <td className='align-middle'>{delivery.orderid?.name || 'N/A'}</td>
              <td className='align-middle'>{delivery.orderid?.shipping_address || 'N/A'}</td>
              <td className='align-middle'>{delivery.orderid?.contact_number || 'N/A'}</td>
              <td className="align-middle">
                <button
                  className="btn btn-warning btn-sm my-1 mr-2"
                  onClick={() => navigate(`/admin/deliveryupdate/${delivery._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm my-1"
                  onClick={() => handleDelete(delivery._id)}
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
    </>
  )
}

export default Delivery