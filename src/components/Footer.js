import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Ma To-Do Liste — Tous droits réservés.
    </footer>
  );
}

export default Footer;