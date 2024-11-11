import React from 'react';
import './Footer.css';
import logo from '../../assets/logo.png'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <div className="footer bg-black text-light pt-5">
        <div className="container">
          <div className="row text-center text-md-left">

            {/* Logo Section */}
            <div className="col-md-3 mb-4">
              <img src={logo} alt="Ruu Lanka" className="footer-logo mb-3" style={{ width: '120px' }} />
            </div>

            {/* Contact Us Section */}
            <div className="col-md-3 mb-4">
              <h5 className="text-uppercase">Contact Us</h5>
              <p>Email: <a href="mailto:anyone@gmail.com" className="text-light">anyone@gmail.com</a></p>
              <p>Phone: +9411223344</p>
              <p>Address: Malabe, Colombo</p>
            </div>

            {/* Quick Links Section */}
            <div className="col-md-3 mb-4">
              <h5 className="text-uppercase">Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
                <li><Link to="/addfeedback" className="text-light text-decoration-none">Feedback</Link></li>
                <li><Link to="#" className="text-light text-decoration-none">Contact Us</Link></li>
                <li><Link to="#" className="text-light text-decoration-none">About Us</Link></li>
              </ul>
            </div>

            {/* Follow Us Section */}
            <div className="col-md-3 mb-4">
              <h5 className="text-uppercase">Follow Us</h5>
              <a href="#" className="text-light me-3"><FaFacebook /></a>
              <a href="#" className="text-light me-3"><FaInstagram /></a>
              <a href="#" className="text-light me-3"><FaTwitter /></a>
              <a href="#" className="text-light"><FaLinkedin /></a>
            </div>

          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom text-center pt-3 mt-4 border-top border-light">
            <p className="mb-0">Copyright ©2024: Designed by <strong>RUU Lanka</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
