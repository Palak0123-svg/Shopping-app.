import React from "react";
import { NavLink } from "react-router-dom";
import { FcHeadset } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import SerachInput from "../form/SerachInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart,setCart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    alert("Logout successfully");
    localStorage.removeItem("auth");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">
            {/* <FcHeadset className="logo"></FcHeadset> */}
            Girlvana
          </Link>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <SerachInput className="m-1 p-1"></SerachInput>
            <li className="nav-item ">
              <NavLink to="/" className="nav-link ">
                Home <span className="sr-only"></span>
              </NavLink>
            </li>
            <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                   Category
                  </NavLink>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to={`/categories`} 
                      >
                      All Categories
                    </Link>
                    {categories?.map((c)=>(
                      <Link className="dropdown-item" to={`/category/${c.slug}`} 
                      >
                      {c.name}
                    </Link>
                    ))}
                  </div>
                </li>
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" href="#">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" href="#">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === "0" ? "user" : "admin"}`}>
                      Dashboard
                    </NavLink>
                    <NavLink className="dropdown-item" to="/login" onClick={handleLogout}>
                      logout
                    </NavLink>
                    
                    
                  </div>
                </li>
              </>
            )}
            <li className="nav-item">
            <Badge count={cart?.length} showZero>
            <NavLink to="/cart" className="nav-link" href="#">
                <img src="/images/carts.png" alt="cart" srcset=""  className="cartpng"/>
              </NavLink>
             </Badge>
              
            </li>
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form> */}
        </div>
      </nav>
    </>
  );
};

export default Header;
