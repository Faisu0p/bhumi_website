import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../../Media/Images/logo.png";

const Header = () => {
  return (
    <header className="header-container">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="navbar-wrapper">
          {/* Logo */}
          <a className="navbar-brand" href="admin">
            <img 
              src={logo}
              alt="Logo" 
              className="logo-img" 
            />
          </a>

          {/* Toggle button for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-links ms-auto">

               {/* Builder Dropdown */}
               <li className="nav-item">
                <div className="nav-link">Builder</div>
                <div className="dropdown-menu">
                  <Link to="/add-builder" className="dropdown-item">Add Builder</Link>
                  <Link to="/manage-builder" className="dropdown-item">Manage Builder</Link>
                  <Link to="/view-builder" className="dropdown-item">View Builder</Link>
                </div>
              </li>
              
              {/* Project Dropdown */}
              <li className="nav-item">
                <div className="nav-link">Project</div>
                <div className="dropdown-menu">
                  <Link to="/add-project" className="dropdown-item">Add Project</Link>
                  <Link to="/manage-project" className="dropdown-item">Manage Project</Link>
                  <Link to="/view-project" className="dropdown-item">View Project</Link>
                </div>
              </li>

              {/* Location Dropdown */}
              <li className="nav-item">
                <div className="nav-link">Location</div>
                <div className="dropdown-menu">
                  <Link to="/add-state" className="dropdown-item">Add State</Link>
                  <Link to="/add-city" className="dropdown-item">Add City</Link>
                  <Link to="/add-locality" className="dropdown-item">Add Locality</Link>
                  <Link to="/add-sublocality" className="dropdown-item">Add Sublocality</Link>
                  <Link to="/add-pincode" className="dropdown-item">Add Pincode</Link>
                </div>
              </li>

              {/* Other Links */}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/view-role">View Role</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-property">View Property</Link>
              </li> */}
              
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
