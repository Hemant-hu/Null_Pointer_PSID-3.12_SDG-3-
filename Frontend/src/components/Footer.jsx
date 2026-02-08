import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Main Footer Content */}
        
        

        {/* Bottom Footer */}
        
          <div className="copyright">
            <p>© {currentYear} SmartCare Hospital System. All rights reserved.</p>
           
          
          
         
        </div>

      </div>
    </footer>
  );
};

export default Footer;