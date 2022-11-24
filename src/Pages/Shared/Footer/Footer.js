import React from "react";
import footer from "../../../Assets/images/footer.png";

const Footer = () => {
  return (
    <div
      className=""
      style={{ background: `url(${footer})`, backgroundSize: "cover" }}
    >
      <footer className="grid lg:grid-cols-3 p-10 footer">
        <div>
          <span className="footer-title">Services</span>
          <a href="/" className="link link-hover">
            Emergency Checkup
          </a>
          <a href="/" className="link link-hover">
            Monthly Checkup
          </a>
          <a href="/" className="link link-hover">
            Weekly Checkup
          </a>
          <a href="/" className="link link-hover">
            Deep Checkup
          </a>
        </div>
        <div>
          <span className="footer-title">ORAL HEALTH</span>
          <a href="/" className="link link-hover">
            Fluoride Treatment
          </a>
          <a href="/" className="link link-hover">
            Cavity Filling
          </a>
          <a href="/" className="link link-hover">
            Teath Whitening
          </a>
        </div>
        <div>
          <span className="footer-title">Our Address</span>
          <a href="/" className="link link-hover">
            New York - 101010 Hudson
          </a>
        </div>
      </footer>
      <div className="text-center mb-4">
        <p>Copyright © 2022 - All right reserved</p>
      </div>
    </div>
  );
};

export default Footer;
