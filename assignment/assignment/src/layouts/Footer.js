import React from "react";
import { FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-container footer">
      <p className="footer-text">
        © {new Date().getFullYear()} E-Shop Project. Made by Tống Thị Như Quỳnh
      </p>
      <div className="social-icons">
        <a
          href="https://github.com/quynhfe"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.facebook.com/bananamilk1410"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="https://www.instagram.com/chocopiee.w___/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram size={24} />
        </a>
      </div>
    </footer>
  );
}
export default Footer;
