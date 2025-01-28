import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import './Products.css'
import SummaryCard from "../../Components/SummaryCard/SummaryCard";
import { ProductOutlined } from "@ant-design/icons";
import { Space } from "antd";

function Products() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5175/product")
      .then(result => setProducts(result.data.products))
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
        axios.delete("http://localhost:5175/product/" + id)
          .then(res => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: "The product has been deleted.",
              icon: "success"
            }).then(() => {
              window.location.reload();
              setProducts(products.filter(product => product._id !== id));
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
    doc.text("Product List", 14, 40);

    doc.setFontSize(12);
    doc.text("Updated product list on " + new Date().toLocaleDateString(), 14, 50);

    // For simplicity, we'll add a placeholder image for now (you can customize this)
    const headers = [["Product ID", "Name", "Description", "Category", "Price"]];

    const rows = filteredProducts.map((product) => [
      product.product_id,
      product.name,
      product.description,
      product.category,
      product.price,
      "",  // Image will be added separately below
    ]);

    const convertImageToBase64 = async (imageUrl) => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error("Error loading image:", error);
        return null;
      }
    };

    doc.autoTable({
      head: headers,
      body: rows,
      startY: 60,
      didDrawCell: async  (data) => {
        if (data.column.index === 5) {
          const product = filteredProducts[data.row.index];
          const imageUrl = `http://localhost:5175/${product.image}`;

          if (product.image) {
            const base64Image = await convertImageToBase64(imageUrl);
            if (base64Image) {
              doc.addImage(base64Image, "JPEG", data.cell.x + 2, data.cell.y + 2, 15, 15);  // Adjust size accordingly
            } else {
              console.warn("Unable to convert image to base64 for product:", product.product_id);
            }
            
          }
        }
      },
    });

    doc.save("product_report_" + new Date().toLocaleDateString() + ".pdf");
  };

  const filteredProducts = products.filter(product =>
    product.product_id.toLowerCase().includes(query.toLowerCase()) ||
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) 
  );

  const menProductsCount = products.filter(product => product.category === "Men").length;
  const womenProductsCount = products.filter(product => product.category === "Women").length;
  const kidsProductsCount = products.filter(product => product.category === "Kids").length;

  return (
    <>
    <Space style={{ padding: '20px '}} size={50} direction="horizontal">
      <SummaryCard icon={<ProductOutlined style={{ color: "green", fontSize: 30 }} />} title={"Total Products"} value={products.length}/>
      <SummaryCard icon={<ProductOutlined style={{ color: "black", fontSize: 30 }} />} title={"Men"} value={menProductsCount}/>
      <SummaryCard icon={<ProductOutlined style={{ color: "red", fontSize: 30 }} />} title={"Women"} value={womenProductsCount}/>
      <SummaryCard icon={<ProductOutlined style={{ color: "blue", fontSize: 30 }} />} title={"Kids"} value={kidsProductsCount}/>
    </Space>

    <div className="container bg-white rounded shadow m-4 p-4">
      <h1 className="mb-4">Product List</h1>

      {/* Search Bar and Add Button */}
      <div className="row mb-4">
        <div className="col-md-4">
          {/* Search bar width */}
          <div className="input-group">
            <input
              type="search"
              placeholder="Search Products..."
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-7 text-right">
          {/* Right-align the button */}
          <button className="btn btn-primary" onClick={() => navigate("/admin/create")}>
            Add Product
          </button>
        </div>
      </div>

      {/* Product Table */}
      <table className="table table-striped table-bordered table-hover text-center">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((products) => (
            <tr key={products._id}>
              <td className="align-middle">{products.product_id}</td>
              <td className="align-middle">{products.name}</td>
              <td className="align-middle">{products.description}</td>
              <td className="align-middle">{products.category}</td>
              <td className="align-middle">{products.price}</td>
              <td className="align-middle">
                {products.image ? (
                  <img
                    src={`http://localhost:5175/${products.image}`}
                    style={{ width: "80px", height: "80px" }}
                    className="img-thumbnail"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td className="align-middle">
                <button
                  className="btn btn-warning btn-sm my-1 mr-2"
                  onClick={() => navigate(`/admin/update/${products._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm my-1"
                  onClick={() => handleDelete(products._id)}
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

  );
}

export default Products;