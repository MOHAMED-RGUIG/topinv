import React, { useState,useEffect, useRef  }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { Link } from 'react-router-dom';

function Navbar() {
  const cartstate = useSelector(state => state.cartReducer);
  const userstate = useSelector(state => state.loginUserReducer);
  const { currentUser } = userstate;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      
    <div className="d-flex text-start sticky">
    <div ref={sidebarRef} className={`sidebar p-4  side-light border-end ${sidebarOpen ? 'open' : ''}`}>
       
        
         
          <div className="list-group list-group-flush p-1">
         {currentUser ? (
   <>
      <Link className="nav-link pb-5" to="#" aria-expanded="false">
        {currentUser.NOMUSR}
        <p style={{ fontSize: '13px', color: '#183F7F' }}>{currentUser.EMAILUSR}</p>
      </Link>
      <Link to="/menu" className="list-group-item list-group-item-action bg-light">
        <i className="bi bi-house-door p-2"></i>Menu
      </Link>
      <Link to="/homescreen" className="list-group-item list-group-item-action bg-light">
        <i className="bi bi-house-door p-2"></i>Liste inv
      </Link>
      <Link to="/cart" className="list-group-item list-group-item-action bg-light">
        <i className="bi bi-heart p-2"></i>Création inv
      </Link>
      <Link to="/validinv" className="list-group-item list-group-item-action bg-light">
        <i className="bi bi-grid p-2"></i>Validation inv
      </Link>
      <Link
        to="/"
        className="list-group-item list-group-item-action bg-light"
        onClick={() => dispatch(logoutUser())}
      >
        <i className="bi bi-box-arrow-right p-2"></i>Logout
      </Link>
   </>
) : (
   <>
      <Link to="/cart" className="list-group-item list-group-item-action bg-light">
        <i className="bi bi-house-door p-2"></i>Acceuil
      </Link>
      <Link to="/" className="list-group-item list-group-item-action bg-light">
        <i className="bi bi-person p-2"></i>Connexion
      </Link>
   </>
)}

        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow-1">
        <nav className="navbar navbar-expand-lg bg-body rounded header">
          <div className="container-fluid">
          <button className="navbar-toggler" type="button" onClick={toggleSidebar} data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav"  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"> </span>
          </button>
        
          <Link className="navbar-brand mx-auto" to="/menu">
  <img src="./logo.jpg" alt="TopClass Logo" style={{ height: '90px', paddingLeft: '15px' }} />
</Link>
{currentUser ? (
   <ul className="navbar-nav ml-auto px-3">
      <li className="nav-item text-start">
         <Link className="nav-link" to="/cart"></Link>
      </li>
   </ul>
) : (
   <Link className="nav-link" to="/login" style={{ textDecoration: 'none' }}>
      <i className="bi bi-person p-2"></i>
   </Link>
)}

          </div>
        </nav>
      </div>
    </div>
    </div>
  );
}

export default Navbar;
