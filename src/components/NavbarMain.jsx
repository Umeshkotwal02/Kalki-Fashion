import { Image, Row, Col, Button, Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import { FcGoogle } from 'react-icons/fc';
import NavbarOne from './Navbar-One';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { CiLogout } from 'react-icons/ci';
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";  

function NavbarMain() {

  const [user, setUser] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorShow] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleClose = () => setActiveModal(null);

  const saveUserDataToDatabase = async (userData) => {
    const db = getDatabase();
    const userId = Date.now().toString();
    const userRef = ref(db, `users/${userId}`);
    await set(userRef, userData)
      .then(() => {
        console.log("User data saved successfully");
      })
      .catch((error) => {
        console.error("Error saving user data: ", error);
      });
  };
  // Register with email and passoword
  const CreateUser = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    if (!firstName || !lastName || !email || !mobile || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Save user data to Firebase Realtime Database
      const userData = {
        firstName,
        lastName,
        email,
        mobile,
        password,
      };
      console.log(" Created UserData ::", userCredential)
      saveUserDataToDatabase(userData);

      toast.success("User details saved successfully!");
      console.log("User details saved to database");

      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setMobile("");
      setPassword("");
      handleClose(); // Close the modal
    } catch (error) {
      toast.error(error.message || "An error occurred while creating the user.");
    }
  };

  // Register with Google Account
  const SignupWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setActiveModal(null);
      toast.success(`Welcome ${user.displayName}`);
      console.log("User Login with Google Successfully:", user);
    } catch (error) {
      toast.error(error.message);
      console.error("Error signing in with Google:", error.message);

    }
  };

  // Login with Email and Password
  const LoginUser = async () => {
    try {
      const loginuser = await signInWithEmailAndPassword(auth, email, password);
      console.log("User Login Data :: ", loginuser);
      toast.success(`Welcome ${loginuser.user.displayName || loginuser.user.email}`);
      setActiveModal(null)
      setErrorShow("");
    } catch (error) {
      console.error("login error::", error.message);
      setErrorShow(error.message);
      toast.error(error.message)
    }
  }

  // Log out the user
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/women");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error.message);
      toast.error(error.message);
    }
  };


  const navigate = useNavigate();

  const handleAccountDetails = () => {
    navigate("/accountdetails");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state
    });
    return unsubscribe; // Cleanup the subscription on unmount
  }, []);



  return (
    <>
      <NavbarOne />
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} bg="light" className="mb-3 border-bottom shadow-sm">
          <Container fluid>
            {/* Left Section (Offcanvas) */}
            <Row className="w-100 align-items-center">
              <Col xs={4} lg={4} md={2} sm={2} sx={2} className="d-flex align-items-center">
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="start"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      Navigation
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-around flex-grow-1 fw-bold">
                      <Nav.Link as={Link} to="/women" className="text-dark">Women</Nav.Link>
                      <Nav.Link as={Link} to="/men" className="text-dark">Men</Nav.Link>
                      <Nav.Link as={Link} to="/bridal" className="text-dark">Bridal</Nav.Link>
                      <Nav.Link as={Link} to="/luxe" className="text-dark">Luxe</Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Col>

              {/* Center Section (Logo) */}
              <Col xs={4} lg={4} md={5} sm={5} className="text-center">
                <Navbar.Brand href="#" className="d-inline-flex align-items-center">
                  <Image src="assets/images/logo.svg" className="img-fluid" alt="Logo" />
                </Navbar.Brand>
              </Col>

              {/* Right Section (Search, Profile, Cart) */}
              <Col xs={4} lg={4} md={5} sm={5} className="d-flex justify-content-end align-items-center">
                {/* Search Bar */}
                <Form className="d-flex  w-75">
                  <Form.Control
                    type="search"
                    placeholder="Search for Styles, Collections & more"
                    className="custom-placeholder border rounded-start"
                    aria-label="Search"
                  />
                  <span className="bg-dark border border-dark rounded-end text-centre">
                    <IoIosSearch className='text-white fs-2 mt-1' />
                  </span>
                </Form>

                {/* Profile Dropdown */}
                {user ? (
                  <span>

                    <Dropdown>
                      <Dropdown.Toggle
                        as="span"
                        id="dropdown-profile"
                        className="fs-3 d-flex align-items-center ms-2"
                        style={{ cursor: "pointer" }}
                      >
                        <CgProfile />
                      </Dropdown.Toggle>

                      <Dropdown.Menu align="end">
                        <Dropdown.Item>
                          <span><span>Welcome! {user.displayName || user.email}</span></span>
                        </Dropdown.Item>
                        {/* Profie  Account Details */}
                        <Dropdown.Item onClick={handleAccountDetails}>
                          <span className='fs-5 me-2'  >
                            <VscAccount />
                          </span>
                          Account Details
                        </Dropdown.Item>
                        {/* Logout */}
                        <Dropdown.Item onClick={handleLogout}>
                          <span className='fs-5 me-2'>
                            <CiLogout />
                          </span>
                          Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                ) : (
                  // Show Profile Icon when user is logged out
                  <span
                    onClick={() => setActiveModal('login')}
                    className="fs-3 d-flex align-items-center ms-2"
                    style={{ cursor: "pointer" }}
                  >
                    <CgProfile />
                  </span>
                )}
                {/* Shopping Cart */}
                <IoCartOutline className="fs-3 mx-2" />
              </Col>
            </Row>
          </Container>
        </Navbar>
      ))}


      {/* Login Model */}
      <Modal show={activeModal === 'login'} onHide={handleClose} size="lg">
        <Row>
          <Col xxl={6} lg={6} md={6}>
            <div className="position-relative" style={{ height: "100%" }}>
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  backgroundImage: "url('assets/images/loginmodal.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.6)",
                }}
              ></div>
              <div
                className="position-relative text-light p-4 d-flex flex-column justify-content-start"
                style={{ height: "100%" }}
              >
                <h2 className="fw-bold">Join the Online Shop Circle!</h2>
                <p className="mt-3">Exclusive benefits include:</p>
                <ul className="list-unstyled">
                  <li>
                    Get 15% off on your first order | <strong>Use code: INDIA15</strong>
                  </li>
                  <li>Early access to collections</li>
                  <li>Exclusive offers and discounts</li>
                </ul>
                <p className="mt-3">
                  Join Now! <small className="text-muted">T &amp; C Apply</small>
                </p>
              </div>
            </div>
          </Col>

          <Col xxl={6} lg={6} className="d-flex flex-column justify-content-center p-4 text-dark">
            <button type="button" className="btn-close align-self-end" aria-label="Close" onClick={handleClose}></button>

            <h5 className="mb-4 text-center">Login</h5>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email || !password) {
                  alert("Please fill in all fields.");
                } else {
                  LoginUser();
                }
              }}
            >
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  className="custom-placeholder"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="warning" className="w-100" type="submit">
                Login
              </Button>
            </Form>
            <hr />
            <div className="d-flex justify-content-center">Forgot Password?</div>
            &nbsp;

            <div className="d-flex justify-content-center">
              <Button
                variant="light"
                className="border-none"
                style={{ all: "unset", cursor: "pointer" }}
                onClick={SignupWithGoogle}
              >
                <FcGoogle className="fs-3 me-1" style={{ cursor: "pointer" }} />
                Login with Google
              </Button>
            </div>
            <hr />
            <div className="d-flex justify-content-center">
              Don't have an account?{" "}
              <button
                onClick={() => setActiveModal("signup")}
                className="btn btn-link p-0 text-decoration-none ms-2"
              >
                Sign Up
              </button>
            </div>
          </Col>
        </Row>
      </Modal>


      {/* Sign-Up Registration Modal */}

      <Modal show={activeModal === 'signup'} onHide={handleClose} centered size="lg">
        <Modal.Body className="p-0">
          <Row className="g-0">
            <Col md={6}>
              <div className="position-relative" style={{ height: "100%" }}>
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    backgroundImage: "url('assets/images/loginmodal.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.6)",
                  }}
                ></div>
                <div
                  className="position-relative text-light p-4 d-flex flex-column justify-content-start"
                  style={{ height: "100%" }}
                >
                  <h2 className="fw-bold">Register & Be A Part Of The KALKI Circle!</h2>
                  <p className="mt-3">Enjoy exclusive benefits like: </p>
                  <ul className="list-unstyled">
                    <li>- Exclusive early collection showcase</li>
                    <li>- Access amazing offers, discounts and more</li>
                  </ul>
                  <p className="mt-3">
                    Join Now! <small className="text-muted">T &amp; C Apply</small>
                  </p>
                </div>
              </div>
            </Col>

            <Col md={6} className="d-flex flex-column justify-content-center p-4">
              <button type="button" className="btn-close align-self-end" aria-label="Close" onClick={handleClose}></button>
              <h5 className="mb-4 text-center">Sign Up</h5>
              <Form onSubmit={CreateUser}>
                <Form.Group controlId="formFirstName" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={() => console.log("First Name focused")}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formLastName" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={() => console.log("Last Name focused")}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => console.log("Email field focused")}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formMobile" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="warning" className="w-100 mb-3">
                  Sign Up
                </Button>
              </Form>
              <hr />
              <div className="d-flex justify-content-center">
                <Button
                  variant="light"
                  style={{ all: "unset", cursor: "pointer" }}
                  onClick={SignupWithGoogle}
                >
                  <FcGoogle className="fs-3 me-1" />
                  Sign with Google
                </Button>
              </div>
              <hr />
              <div className="text-center">
                Already Have an account?{" "}
                <span onClick={() => setActiveModal("login")} className="btn btn-link text-decoration-none">
                  Login
                </span>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

    </>
  );
}

export default NavbarMain;
