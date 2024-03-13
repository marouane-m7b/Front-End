import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/features/categorie/categorieSlice";
import Loader from "../../miniComponents/loader/Loader";

function ClientVendeurLayout({ handleRemoveAuth, isClientAuth }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const categories = useSelector((state) => state.categories.categories)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const res = await axios.post("/api/client_vendeur/logout");

      if (res.data.status === 200) {
        localStorage.removeItem("login_token");
        localStorage.removeItem("login_image");
        localStorage.removeItem("login_role");
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success",
        });
        handleRemoveAuth("client_vendeur");
        navigate("/auth");
      }
    } catch (error) {
      console.error("Error during Loggin out", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const profileSection = () => {
    if (isClientAuth) {
      return (
        <>
          {/* salam */}
          <img onClick={handleLogout} style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid white',
            cursor: 'pointer'
          }} src={`https://ofpptecomtest.infinityfreeapp.com/${localStorage.getItem('login_image')}`} alt="" />
        </>
      )
    }
  }

  const displayCategorie = () => {
    return categories?.map((categorie, keyCategorie) => {
      return (
        <li key={keyCategorie}>
          <a href="product-grids.html">{categorie.nom}</a>
        </li>
      )
    })
  }

  return (
    <>
      {isSubmitting && <div style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        background: '#00000069',
        zIndex: '999',
        display: 'grid',
        placeItems: 'center'
      }}>
        <Loader />
      </div>}
      <header className="header navbar-area">
        <div className="topbar">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="top-left">
                  <ul className="menu-top-link">
                    <li>
                      <div className="select-position">
                        <select defaultValue='0' id="select4">
                          <option value="0">$ USD</option>
                          <option value="1">€ EURO</option>
                          <option value="2">$ CAD</option>
                          <option value="3">₹ INR</option>
                          <option value="4">¥ CNY</option>
                          <option value="5">৳ BDT</option>
                        </select>
                      </div>
                    </li>
                    <li>
                      <div className="select-position">
                        <select defaultValue='0' id="select5">
                          <option value="0">English</option>
                          <option value="1">Español</option>
                          <option value="2">Filipino</option>
                          <option value="3">Français</option>
                          <option value="4">العربية</option>
                          <option value="5">हिन्दी</option>
                          <option value="6">বাংলা</option>
                        </select>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="top-end">
                  {profileSection()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-3 col-7">
                <Link className="navbar-brand" to="/">
                  <img src="assets/blue/images/logo/logo.svg" alt="Logo" />
                </Link>
              </div>
              <div className="col-lg-5 col-md-7 d-xs-none">
                <div className="main-menu-search">
                  <div className="navbar-search search-style-5">
                    <div className="search-select">
                      <div className="select-position">
                        <select defaultValue='1' id="select1">
                          <option>All</option>
                          <option value="1">option 01</option>
                          <option value="2">option 02</option>
                          <option value="3">option 03</option>
                          <option value="4">option 04</option>
                          <option value="5">option 05</option>
                        </select>
                      </div>
                    </div>
                    <div className="search-input">
                      <input type="text" placeholder="Search" />
                    </div>
                    <div className="search-btn">
                      <button><i className="lni lni-search-alt"></i></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-2 col-5">
                <div className="middle-right-area">
                  <div className="nav-hotline">
                    <i className="lni lni-phone"></i>
                    <h3>Hotline:
                      <span>(+212) 632287513</span>
                    </h3>
                  </div>
                  <div className="navbar-cart">
                    <div className="wishlist">
                      <a href="">
                        <i className="lni lni-heart"></i>
                        <span className="total-items">0</span>
                      </a>
                    </div>
                    <div className="cart-items">
                      <a href="" className="main-btn">
                        <i className="lni lni-cart"></i>
                        <span className="total-items">2</span>
                      </a>
                      <div className="shopping-item">
                        <div className="dropdown-cart-header">
                          <span>2 Items</span>
                          <a href="cart.html">View Cart</a>
                        </div>
                        <ul className="shopping-list">
                          {/* <CartProduit />
                          <CartProduit /> */}
                        </ul>
                        <div className="bottom">
                          <div className="total">
                            <span>Total</span>
                            <span className="total-amount">$134.00</span>
                          </div>
                          <div className="button">
                            {/* <a href="checkout.html"></a> */}
                            <Link className="btn animate" to='/checkout'>Checkout</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-6 col-12">
              <div className="nav-inner">
                <div className="mega-category-menu">
                  <span className="cat-button"><i className="lni lni-menu"></i>All Categories</span>
                  <ul className="sub-category">
                    {displayCategorie()}
                  </ul>
                </div>
                <nav className="navbar navbar-expand-lg">
                  <button className="navbar-toggler mobile-menu-btn" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                    <ul id="nav" className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <Link to="/" className="active">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/vendeurs" className="active">Vendeurs</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/profile" className="active">Profile</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/message" className="active">Message</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="nav-social">
                <h5 className="title">Follow Us:</h5>
                <ul>
                  <li>
                    <a href=""><i className="lni lni-facebook-filled"></i></a>
                  </li>
                  <li>
                    <a href=""><i className="lni lni-twitter-original"></i></a>
                  </li>
                  <li>
                    <a href=""><i className="lni lni-instagram"></i></a>
                  </li>
                  <li>
                    <a href=""><i className="lni lni-skype"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="main container" style={{ paddingTop: '20px' }}>
        <Outlet />
      </div>
      <footer className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="inner-content">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="footer-logo">
                    <a href="index.html">
                      <img src="assets/blue/images/logo/white-logo.svg" alt="#" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-9 col-md-8 col-12">
                  <div className="footer-newsletter">
                    <div className="newsletter-form-head">
                      <form action="#" method="get" target="_blank" className="newsletter-form">
                        <input name="EMAIL" placeholder="Email address here..." type="email" />
                        <div className="button">
                          <button className="btn">Subscribe<span className="dir-part"></span></button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-middle">
          <div className="container">
            <div className="bottom-inner">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="single-footer f-contact">
                    <h3>Get In Touch With Us</h3>
                    <p className="phone">Phone: (+212) 632287513</p>
                    <ul>
                      <li><span>Monday-Friday: </span> 9.00 am - 8.00 pm</li>
                      <li><span>Saturday: </span> 10.00 am - 6.00 pm</li>
                    </ul>
                    <p className="mail">
                      <a href="mailto:support@shopgrids.com">support@shopgrids.com</a>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="single-footer our-app">
                    <h3>Our Mobile App</h3>
                    <ul className="app-btn">
                      <li>
                        <a href="">
                          <i className="lni lni-apple"></i>
                          <span className="small-title">Download on the</span>
                          <span className="big-title">App Store</span>
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <i className="lni lni-play-store"></i>
                          <span className="small-title">Download on the</span>
                          <span className="big-title">Google Play</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="single-footer f-link">
                    <h3>Information</h3>
                    <ul>
                      <li><a href="">About Us</a></li>
                      <li><a href="">Contact Us</a></li>
                      <li><a href="">Downloads</a></li>
                      <li><a href="">Sitemap</a></li>
                      <li><a href="">FAQs Page</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="single-footer f-link">
                    <h3>Shop Departments</h3>
                    <ul>
                      <li><a href="">Computers & Accessories</a></li>
                      <li><a href="">Smartphones & Tablets</a></li>
                      <li><a href="">TV, Video & Audio</a></li>
                      <li><a href="">Cameras, Photo & Video</a></li>
                      <li><a href="">Headphones</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="inner-content">
              <div className="row align-items-center">
                <div className="col-lg-6 col-12">
                  <div className="copyright">
                    <p>
                      Designed and Developed by
                      <a href="https://graygrids.com/" rel="nofollow">GrayGrids</a>
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <ul className="socila">
                    <li>
                      <span>Follow Us On:</span>
                    </li>
                    <li><a href=""><i className="lni lni-facebook-filled"></i></a></li>
                    <li><a href=""><i className="lni lni-twitter-original"></i></a></li>
                    <li><a href=""><i className="lni lni-instagram"></i></a></li>
                    <li><a href=""><i className="lni lni-google"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

ClientVendeurLayout.propTypes = {
  handleRemoveAuth: PropTypes.func.isRequired,
  isClientAuth: PropTypes.bool.isRequired
};

export default ClientVendeurLayout;
