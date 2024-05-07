
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Navbar = () => {
  return (
    <nav class="navbar bg-body-tertiary fixed-top">
    <div class="container-fluid" >
     
        <div >
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
            <li><Link to="/">Home</Link></li>
           
            </li>
            
            <li class="nav-item ">
              
              <ul >
              <li><Link to="/Login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/logout">Logout</Link></li>
              </ul>
            </li>
          </ul>
          
        </div>
      </div>
    
  </nav>
 );
}

export default Navbar;
