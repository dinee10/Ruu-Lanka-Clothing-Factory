import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { MailOutlined, ProductOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import SummaryCard from '../../Components/SummaryCard/SummaryCard';
import Email from '../../Components/Email/Email';

function Order() {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false); // State to control the modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order for email
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5174/order")
      .then(result => setOrders(result.data.orders))
      .catch(err => console.log(err));
  }, []);

  const handleEmailClick = (orders) => {
    setSelectedOrder(orders); // Set the selected order when Email button is clicked
    setShowEmailModal(true); // Show the email modal
  };

  const sendEmail = (email) => {
    // Close the modal
    setShowEmailModal(false);

    // Use Axios to send the email to the backend
    axios.post(`http://localhost:5174/order/send-email/${selectedOrder._id}`, { email })
      .then(res => {
        Swal.fire("Email Sent!", "The order details have been sent via email.", "success");
      })
      .catch(err => {
        console.log(err);
        Swal.fire("Error", "There was a problem sending the email.", "error");
      });
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
        axios.delete("http://localhost:5174/order/" + id)
          .then(res => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: "The order has been deleted.",
              icon: "success"
            }).then(() => {
              window.location.reload();
              setOrders(orders.filter(order => order._id !== id));
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
    doc.text("Order List", 14, 40);

    doc.setFontSize(12);
    doc.text("Updated order list on " + new Date().toLocaleDateString(), 14, 50);

    // For simplicity, we'll add a placeholder image for now (you can customize this)
    const headers = [["Order ID", "Name", "Shipping Address", "Order Status", "Contact No"]];

    const rows = filteredOrders.map((order) => [
      order.order_id,
      order.name,
      order.shipping_address,
      order.order_status,
      order.contact_number,
    ]);

    doc.autoTable({
      head: headers,
      body: rows,
      startY: 60,
     
    });

    doc.save("order_report_" + new Date().toLocaleDateString() + ".pdf");
  };

  const filteredOrders = orders.filter(order =>
    order.order_id.toLowerCase().includes(query.toLowerCase()) ||
    order.name.toLowerCase().includes(query.toLowerCase()) ||
    order.shipping_address.toLowerCase().includes(query.toLowerCase()) ||
    order.order_status.toLowerCase().includes(query.toLowerCase()) 
  );
  const progressCount = orders.filter(order => order.order_status === "In Progress").length;
  const deliveredCount = orders.filter(order => order.order_status === "Delivered").length;
  const failedCount = orders.filter(order => order.order_status === "Failed").length;

  return (
    <>
    <Space style={{ padding: '20px '}} size={50} direction="horizontal">
      <SummaryCard icon={<ProductOutlined style={{ color: "green", fontSize: 30 }} />} title={"Total Orders"} value={orders.length}/>
      <SummaryCard icon={<ProductOutlined style={{ color: "black", fontSize: 30 }} />} title={"In Progress"} value={progressCount}/>
      <SummaryCard icon={<ProductOutlined style={{ color: "red", fontSize: 30 }} />} title={"Delivered"} value={deliveredCount}/>
      <SummaryCard icon={<ProductOutlined style={{ color: "blue", fontSize: 30 }} />} title={"Failed"} value={failedCount}/>
    </Space>

    <div className="container bg-white rounded shadow m-4 p-4 ">
      <h1 className="mb-4">Order List</h1>

      {/* Search Bar and Add Button */}
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

        <div className="col-md-7 text-right">
          {/* Right-align the button */}
          <button className="btn btn-primary mx-2" onClick={() => navigate('/admin/details')}>
            Details
          </button>
          <button className="btn btn-primary mx-2" onClick={() => navigate('/admin/ordercreate')}>
            Add Order
          </button>
        </div>
      </div>

      {/* Order Table */}
      <table className="table table-striped table-bordered table-hover text-center">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Name</th>
            <th scope="col">Shipping Address</th>
            <th scope="col">Order Status</th>
            <th scope="col">Contact No</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((orders) => (
            <tr key={orders._id}>
              <td className="align-middle">{orders.order_id}</td>
              <td className="align-middle">{orders.name}</td>
              <td className="align-middle">{orders.shipping_address}</td>
              <td className="align-middle">{orders.order_status}</td>
              <td className="align-middle">{orders.contact_number}</td>
              <td className="align-middle">
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => navigate(`/admin/orderupdate/${orders._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm mr-2"
                  onClick={() => handleDelete(orders._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => handleEmailClick(orders)}
                >
                  Email
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Email Modal Popup */}
      <Email
          show={showEmailModal}
          handleClose={() => setShowEmailModal(false)}
          sendEmail={sendEmail}
        />

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

export default Order