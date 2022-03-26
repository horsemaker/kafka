import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-icons">
        <a href="https://www.instagram.com/horsemaker_/">
          <i className="fa-brands fa-instagram footer-icon"></i>
        </a>
        <a href="https://www.linkedin.com/in/yashghodekar/">
          <i className="fa-brands fa-linkedin-in footer-icon"></i>
        </a>
        <a href="https://www.doglapan.com/">
          <i className="fa-brands fa-facebook-f footer-icon"></i>
        </a>
        <a href="https://github.com/horsemaker/oasis">
          <i className="fa-brands fa-github footer-icon"></i>
        </a>
      </section>
    </footer>
  );
};
