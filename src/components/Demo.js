import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { IoDiamondOutline, FiAtSign } from "../utils/Icons";
import { FiAtSign } from "react-icons/fi";
import { IoDiamondOutline } from "react-icons/io5";
import { PiStarFourFill } from "react-icons/pi";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { resetError, resetSuccess } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/Thunk/authTunk";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, error, success } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    return () => {
      // Perform any necessary cleanup here
      dispatch(resetError());
      dispatch(resetSuccess());
    };
  }, [dispatch]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
   
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetError());
    console.log(formData);

    try {
      await dispatch(loginUser(formData)).unwrap();
      dispatch(resetSuccess());
      setTimeout(() => navigate("/category"), 1000);
    } catch (errorno) {
      console.log("error in login component::", error);
    }
  };

  return (
    <Container fluid className="d-grid align-items-center">
      <Row className="min-vh-100">
        <Col xs={12} md={6} className="p-0 d-grid">
          <div
            className="p-4 p-md-5 align-content-between align-content-md-end d-grid"
            style={{ minHeight: "300px" }}
          >
            <div className="guy-using-phone"></div>
            <div className="guy-bg-color"></div>
            <div className="d-flex justify-content-center align-items-center d-md-none">
              <a href="/signin" className="p-1 anchor-div-1">
                <img
                  src="/asset/images/printfuseFullLogo.png"
                  alt="printfuse-full-logo"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </a>
            </div>
            <h5 className="m-0  font-decoration-signin">
              “Design and sell 200+ print on demand products hasslefree. Benefit
              from the most competitive prices and maximize your profits.”
            </h5>
          </div>
        </Col>
        <Col xs={12} md={6} className="p-0 d-grid">
          <div
            className=" d-grid px-3 px-lg-5 py-5 position-relative"
            style={{ backgroundColor: "#f5eee9" }}
          >
            <div className="d-none d-md-flex align-items-center justify-content-center position-absolute start-50 logo-div">
              <a href="/signin" className="p-1 anchor-div">
                <img
                  src="/asset/images/printfuseFullLogo.png"
                  alt="printfuse-full-logo"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </a>
            </div>
            <Container className="d-grid gap-4 px-xl-5 position-relative left-side-holder">
              <div className="d-none d-md-block icon-in-sign">
                <FiAtSign className="first" />
                <PiStarFourFill className="second" />
                <IoDiamondOutline className="third" />
                <PiStarFourFill className="fourth" />
              </div>

              <div className="d-grid px-md-5">
                <Form onSubmit={handleSubmit}>
                  <h1 className=" fw-bolder m-0 text-center my-2">
                    Hello Again !
                  </h1>
                  <Row className="g-2">
                    <Col xs={12} className="px-1 d-grid align-content-start">
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="mb-0">
                          Email
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your Email"
                          required
                          className="py-2"
                          onBlur={handleBlur}
                          style={{
                            borderColor:
                              touched.email && !formData.email ? "red" : "",
                          }}
                        />
                        {(error?.email ||
                          (touched.email && !formData.email)) && (
                          <div
                            style={{
                              color: "red",
                              fontSize: "15px",
                              fontWeight: "normal",
                            }}
                          >
                            {error?.email ? error.email : "*Email is required"}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} className="px-1 d-grid align-content-start">
                      <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label className="mb-0">
                          Password<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="py-2"
                            required
                            onBlur={handleBlur}
                            style={{
                              borderColor:
                                touched.password && !formData.password
                                  ? "red"
                                  : "",
                            }}
                          />
                          <span
                            onClick={togglePasswordVisibility}
                            style={{
                              cursor: "pointer",
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          >
                            {!showPassword ? <FiEyeOff /> : <FiEye />}
                          </span>
                        </div>
                        {(error?.password ||
                          (touched.password && !formData.password)) && (
                          <div
                            style={{
                              color: "red",
                              fontSize: "15px",
                              fontWeight: "normal",
                            }}
                          >
                            {error?.password
                              ? error.password
                              : "*Password is required"}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col lg={12} md={12} className="mt-3">
                      <div className="text-start d-flex submit-button">
                        <Button type="submit" className=" button w-100">
                          Log In
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <div className="d-grid gap-3 pt-sm-3 pt-4">
                    <span className=" text-center" style={{ fontSize: "16px" }}>
                      Have no account yet?
                      <a
                        className="text-decoration-none "
                        style={{ fontWeight: "600", color: "#12715b" }}
                        href="/signup"
                      >
                        Signup
                      </a>
                    </span>
                  </div>
                </Form>
              </div>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
