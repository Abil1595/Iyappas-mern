import React, { useState } from "react";
import {
  Nav,
  Navbar,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  NavbarBrand,
  Container,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Image } from "react-bootstrap";
import { logoutUser } from "../../actions/userActions";
import { toast } from "react-toastify";

function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const [nav1, setNav] = useState(false);
  const Navtoggle = () => setNav(!nav1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
    toast('Logged Out Successfully!', {
      type: 'success',
      position: 'bottom-center',
    });
  };

  return (
    <div>
      <Container fluid>
        <Navbar color="light" light expand="lg">
          <NavbarBrand>
            <Link className="women-link" to="/">
              <img src="/Images/iyappaa.png" width="120" height="60" alt="logo" />
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={Navtoggle} />
          <Collapse isOpen={nav1} navbar>
            <Nav className="navbar-nav" navbar>
              <NavItem>
                <NavLink>
                  <Link className="women-link" to="/">
                    <div className="home">Overview</div>
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link className="women-link" to="/products">
                    <div className="home">All Products</div>
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Dropdown className="d-inline">
                    <Dropdown.Toggle
                      variant="default text-black pr-5" id="dropdown-basic"
                       // Aligns text and caret
                       style={{transform: 'translateY(-7px)', alignItems: 'center'}}
                    >
                      Categories {/* Space between text and caret */}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link className="dropdown-item" to="/search?category=SNACKS">
                          Snacks
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link className="dropdown-item" to="/search?category=GROCERIES">
                          Groceries
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link className="dropdown-item" to="/search?category=HERBAL">
                          Herbal
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link className="dropdown-item" to="/search?category=CANDIES">
                          Candies
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link className="dropdown-item" to="/search?category=SWEETS">
                          Sweets
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link className="dropdown-item" to="/search?category=RICE">
                          Rice
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link className="dropdown-item" to="/search?category=OIL">
                          Oil
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link className="dropdown-item" to="/search?category=HOMEAPPLIANCES">
                          Home Appliances
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link className="dropdown-item" to="/search?category=POOJAITEMS">
                          PoojaItems
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link className="women-link" to="/aboutus">
                    About Us
                  </Link>
                </NavLink>
              </NavItem>
            </Nav>

            {/* Right-aligned elements */}
            <Nav className="navbar-nav-right" navbar>
              <NavItem>
                <NavLink>
                  <Search />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  {isAuthenticated && user ? (
                    <Dropdown className="d-inline">
                      <Dropdown.Toggle variant="default text-black pr-5" id="dropdown-basic">
                        <figure className="avatar avatar-nav">
                          <Image
                            width="50px"
                            src={user.avatar || './images/default_avatar.png'}
                            alt="User Avatar"
                          />
                        </figure>
                        <span>{user.name}</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {user.role === "admin" && (
                          <Dropdown.Item
                            onClick={() => {
                              navigate("admin/dashboard");
                            }}
                            className="text-dark"
                          >
                            Dashboard
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item
                          onClick={() => {
                            navigate("/myprofile");
                          }}
                          className="text-dark"
                        >
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            navigate("/orders");
                          }}
                          className="text-dark"
                        >
                          Orders
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logoutHandler} className="text-danger">
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Link to="/login" className="btn" id="login_btn">
                      Login
                    </Link>
                  )}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to="/cart">
                    <span id="cart" className="ml-1 text-black">
                    <i className="fas fa-shopping-cart"></i> 
                    </span>
                  </Link>
                  <span className="ml-1" id="cart_count">
                    {cartItems.length}
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <br />
      </Container>
    </div>
  );
}

export default Header;
