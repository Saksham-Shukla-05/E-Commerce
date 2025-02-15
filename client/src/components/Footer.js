import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <h4 className="text-center">All right reserved &copy; Saksham Shukla</h4>
      <p className="text-center mt-3">
        <Link to={"/about"}>About</Link>|<Link to={"/contact"}>Contact</Link>|
        <Link to={"/contact"}>Contact</Link>|
        <Link to={"/privacy"}>Privacy Policy</Link>
      </p>
    </div>
  );
}
