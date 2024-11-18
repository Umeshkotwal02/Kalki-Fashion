import { Col, Navbar, Row } from "react-bootstrap";
import { FaEarthAmericas } from "react-icons/fa6";

const NavbarOne = () => {
  return (
    <>
      <Row className="mx-0">
        <Col className="px-0">
          <Navbar className="d-flex align-items-center justify-content-center bg-dark"> {/* Flex utilities for centering */}
            <Navbar.Text
              className="text-white text-center fw-bolder"
              style={{ fontSize: "0.9rem" }}
            >
                <FaEarthAmericas className="me-2 fs-6" />
                Shipping Happiness to 200 Countries (FREE Over US$200)
            </Navbar.Text>
          </Navbar>
        </Col>
      </Row>
    </>
  );
};

export default NavbarOne;
