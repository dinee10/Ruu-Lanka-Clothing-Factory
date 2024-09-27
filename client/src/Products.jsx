import axios from "axios";
import React, { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable"

function Products () {
    const [products, setProducts] = useState([])
    const [query, setQuery] = useState("")

    useEffect(()=> {
        axios.get("http://localhost:5174")
        .then(result => setProducts(result.data))
        .catch(err => console.log(err))
    }, [])

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
                axios.delete("http://localhost:5174/product/"+id)
                .then(res => {console.log(res)
                    Swal.fire({
                        title: "Deleted!",
                        text: "The product has been deleted.",
                        icon: "success"
                    }).then(() => {window.location.reload();})
                    
                })
                .catch(err => console.log(err)) 
            }
          })    
        
    }

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text("RUU Lanka Handlooms Clothing Factory PVT(LTD)", 105, 20, {align: "center"});
        
        doc.setFontSize(16);
        doc.text("Product List", 14, 40);

        doc.setFontSize(12);
        doc.text("Updated product list on " +new Date().toLocaleDateString(), 14, 50)

        const headers = [
            ["Product ID", "Name", "Description", "Material", "Price"],
        ];

        const rows = products.map((products) => [
            products.product_id,
            products.name,
            products.description,
            products.material,
            products.price
        ]);

        doc.autoTable({
            head: headers,
            body: rows,
            startY: 60
        });

        doc.save("product_report_" +new Date().toLocaleDateString() + ".pdf");
    };



    const filteredProducts = products.filter(products => 
        products.product_id.toLowerCase().includes(query.toLowerCase()) ||
        products.name.toLowerCase().includes(query.toLowerCase()) ||
        products.description.toLowerCase().includes(query.toLowerCase()) ||
        products.material.toLowerCase().includes(query.toLowerCase()) ||
        products.price.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="container-bh">
			<h1>Product List</h1>
            <input type="search" placeholder="Search Products..." className="search-bar" value={query} onChange={(e) => setQuery(e.target.value)}/>
            <button className="btn1" onClick={() => navigate('/create')}>Add Product</button>
			<table className="grades-table">
				<thead>
					<tr>
						<th>Product ID</th>
						<th>Name</th>
						<th>Description</th>
						<th>Material</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
                        filteredProducts.map((products) => {
                            return (
                            <tr key={products._id}>
                                <td>{products.product_id}</td>
                                <td>{products.name}</td>
                                <td>{products.description}</td>
                                <td>{products.material}</td>
                                <td>{products.price}</td>
                                <td>
                                    <button className="btn1" onClick={() => navigate(`/update/${products._id}`)}>Edit</button>
                                    <button className="btn1" onClick={(e) => handleDelete(products._id)}>Delete</button></td>
                            </tr>
                            )
                        })
                    }
				</tbody>
			</table>
            <div className="generate">
                <button className="btn1" onClick={generatePDF}>Generate Report</button>
            </div>
            
		</div>
    )
}

export default Products;