import { Card, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const { Meta } = Card;


function HomeContent_2() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch products when the component is mounted
    axios
    .get(`http://localhost:5175/product`) // Replace with your actual API endpoint
    .then(response => {
      console.log(response.data); // Debug: Inspect API response structure
      setProducts(response.data.products || []); // Use fallback to an empty array
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      setProducts([]); // Ensure `products` remains an array on error
    });
}, []);


  return (
    <div>
      <h2 className='fw-bold mt-3 text-center'>All Products</h2>
    <section id='products-section'>
      <div className="d-flex bg-dark p-4 my-4 rounded" >
        <Row gutter={[16, 16]}>
          {products.map((products) => (
            <Col xs={24} sm={12} md={8} lg={6} key={products._id}> {/* 4 columns on large screens */}
              <Card
                hoverable
                cover={<img alt={products.name} src={`http://localhost:5175/${products.image}`} />} // product.image should be the image URL
                onClick={() => navigate(`/productview/${products._id}`)}
              >
                <Meta title={products.name} description={`Rs.${products.price}`} style={{ fontSize: '24px', fontWeight: 'bold' }}/>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
    </div>
  );
}

export default HomeContent_2;
