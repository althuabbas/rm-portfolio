import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="minimalist-footer">
      <div className="wrapper">
        <div className="footer-top">
          {/* Left column - Logo and email */}
          <div className="footer-column">
           
            <div className="email-section">
              <p className="email-label">// SHOOT US AN EMAIL</p>
              <a href="mailto:hello@rihamehindi.com" className="email-link">
                hello@rihamehindi.com
              </a>
            </div>
          </div>

          {/* Middle column - Navigation */}
          <div className="footer-column">
            <p className="section-label">• NAVIGATION</p>
            <nav className="footer-nav">
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">
                    Works <span className="count">[004]</span>
                  </a>
                </li>
                <li>
                  <a href="#">Our Studio</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Right column - Socials */}
          <div className="footer-column">
            <p className="section-label">• SOCIALS</p>
            <nav className="footer-socials">
              <ul>
                <li>
                  <a href="#">Twitter (X)</a>
                </li>
                <li>
                  <a href="#">LinkedIn</a>
                </li>
                <li>
                  <a href="#">Discord</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="footer-newsletter">
          <p className="section-label">• NEWSLETTER</p>
          <p className="newsletter-description">
            // RECEIVE UPDATES AND NEWS FROM US
          </p>

          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              SUBMIT <span>•</span>
            </button>
          </form>
        </div>

        {/* Location info */}
        {/* <div className="footer-location">
          <p>
            LOCATED IN UAE, DUBAI , WORKING GLOBALLY  
          </p>
        </div> */}

        {/* Large branded text */}
        <div className="footer-branding">
          <h2>RIHA MEHINDI</h2>
        </div>

        {/* Footer bottom - Copyright */}
        <div className="footer-bottom">
          <p>©2025 RIHA MEHINDI™ // ALL RIGHTS RESERVED</p>
          <div className="footer-bottom-links">
            <a href="#">WE RESPECT YOUR PRIVACY</a>
            <p>
              WEBSITE BY <a href="#">HNY</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
