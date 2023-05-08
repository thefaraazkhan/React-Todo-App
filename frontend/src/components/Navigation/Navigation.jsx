import "./Navigation.css";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { adminLogOut } from "../../helpers/auth";

const Navigation = () => {
  const [LS, setLS] = useState(false);
  const [isActive, setIsactive] = useState(false);
  const [yourProfile, setYourProfile] = useState(false);
  const [dashboardOption, setDashboardOption] = useState(false);
  const [showRegisterLoginOption, setShowRegisterLoginOption] = useState(true);

  const history = useHistory();

  const toggle = () => {
    setIsactive(!isActive);
  };

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem('admin'));
    setLS(ls);
    if (ls && ls.isAdmin === true && ls.isSuperAdmin === false) {
      setDashboardOption(true)
    }

    if (ls && ls.isAdmin === true && ls.isSuperAdmin === false) {
      setShowRegisterLoginOption(false);
    }

    if (ls && ls.isAdmin === true && ls.isSuperAdmin === false) {
      setYourProfile(true);
    }



    if (ls && ls.isSuperAdmin === true && ls.isSuperAdmin === true) {
      setDashboardOption(false)
    }

    if (ls && ls.isSuperAdmin === true && ls.isSuperAdmin === true) {
      setShowRegisterLoginOption(false);
    }

    if (ls && ls.isSuperAdmin === true && ls.isSuperAdmin === true) {
      setYourProfile(false);
    }
  }, []);

  const reloadFunction = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2);
  };

  const handleAdminLogOut = () => {
    const confirmed = window.confirm("Are you sure to logout");

    if (confirmed) {
      adminLogOut(() => {
        history.push("/login");
      });
      reloadFunction();
    }
  };

  return (
    <div className="nav-header">
      <div className={`circle-container ${isActive ? "show-nav" : ""}`}>
        <div className="circle" onClick={toggle}>
          <button id="close">
            <i className="fas fa-times"></i>
          </button>
          <button id="open">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <i className="fas fa-home"></i> <Link to="/" onClick={reloadFunction}>Home</Link>
          </li>
          {showRegisterLoginOption && <li>
            <i className="fas fa-address-book"></i> <Link to="/register" onClick={reloadFunction}>Register</Link>
          </li>}
          {showRegisterLoginOption && <li>
            <i className="fas fa-user"></i> <Link to="/login " onClick={reloadFunction}>Login</Link>
          </li>}
          {dashboardOption && <li>
            <i className="fas fa-envelope"></i> <Link to="/dashboard" onClick={reloadFunction}>Your DashBoard</Link>
          </li>}
          {yourProfile && <li>
            <i className="fas fa-envelope"></i> <Link to="/editprofile " onClick={reloadFunction}>Your Profile</Link>
          </li>}
        </ul>
      </nav>
      <div className="nav-h1">
        <span>Exchange of Goods</span>
        <div className="web-nav">
          <div>
            <Link to="/" onClick={reloadFunction}>Home</Link>
          </div>

          <div>
            {showRegisterLoginOption &&
              <Link to="/register" onClick={reloadFunction}>Register</Link>
            }
          </div>

          <div>
            {showRegisterLoginOption &&
              <Link to="/login " onClick={reloadFunction}>Login</Link>
            }
          </div>

          <div>
            {dashboardOption &&
              <Link to="/dashboard" onClick={reloadFunction}>DashBoard</Link>
            }
          </div>

          <div>
            {yourProfile &&
              <Link to="/editprofile " onClick={reloadFunction}>Profile</Link>
            }
          </div>

          <div>
            {yourProfile &&
              <Link to="/chats " onClick={reloadFunction}>Chats</Link>
            }
          </div>


        </div>
      </div>

      {dashboardOption && <div className="sign-out-btn">
        <button className="new-product-btn" onClick={handleAdminLogOut}>
          <i className="fas fa-sign-out-alt"></i>
          Sign out
        </button>
      </div>}

      {LS?.isSuperAdmin === true && <div className="sign-out-btn">
        <button className="new-product-btn" onClick={handleAdminLogOut}>
          <i className="fas fa-sign-out-alt"></i>
          Sign out
        </button>
      </div>}

    </div>
  );
};

export default Navigation;
