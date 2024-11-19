import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container, Card, InputGroup } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { getDatabase, ref, set, get } from "firebase/database";
import { database } from "../components/firebase";

function AccountDetails() {
    const [region, setRegion] = useState("");
    const [countryId, setCountryId] = useState(0);
    const [stateId, setStateId] = useState(0);
    const [accountFormData, setAccountFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        gender: "",
        age: 18,
        interests: [],
        dob: "",
        country: "",
        state: "",
        city: "",
        profileImage: "",
    });
    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(null);

    // Fetch all users
    const fetchData = async () => {
        try {
            const snapshot = await get(ref(database, "users"));
            if (snapshot.exists()) {
                const data = snapshot.val();
                const formattedData = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...value,
                }));
                setUsers(formattedData);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountFormData({ ...accountFormData, [name]: value });
    };

    const handlePhoneChange = (value) => {
        setAccountFormData({ ...accountFormData, mobile: value });
    };

    const handleCountryChange = (selectedCountry) => {
        if (selectedCountry) {
            setCountryId(selectedCountry.id);
            setAccountFormData({ ...accountFormData, country: selectedCountry.name });
        }
    };

    const handleStateChange = (selectedState) => {
        if (selectedState) {
            setStateId(selectedState.id);
            setAccountFormData({ ...accountFormData, state: selectedState.name });
        }
    };

    const handleCityChange = (selectedCity) => {
        if (selectedCity) {
            setAccountFormData({ ...accountFormData, city: selectedCity.name });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = editId || Date.now().toString();
            await set(ref(database, `users/${userId}`), accountFormData);
            alert(editId ? "Data updated successfully!" : "Data saved successfully!");
            setEditId(null);
            setAccountFormData({
                firstname: "",
                lastname: "",
                email: "",
                mobile: "",
                gender: "",
                dob: "",
                age: 18,
                interests: [],
                country: "",
                state: "",
                city: "",
                profileImage: "",
            });
            fetchData();
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleEdit = (user) => {
        setEditId(user.id);
        setAccountFormData(user);
    };

    return (
        <Container>
            <Row>
                <Col lg={6} md={6} className="mt-5">
                    {users.map((user) => (
                        <Card
                            key={user.id}   
                            className="mb-3 shadow rounded-lg border-0"
                            style={{ width: '20rem', overflow: 'hidden', backgroundColor: '#f9f9f9' }}
                        >
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <Card.Img
                                        variant="top"
                                        src={users.profileImage || "https://via.placeholder.com/100"}
                                        alt="Profile"
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                            marginRight: "15px",
                                            border: "2px solid #007bff"
                                        }}
                                    />
                                    <div>
                                        <Card.Title className="text-primary mb-1">
                                            {user.firstname} {user.lastname}
                                        </Card.Title>
                                        <Card.Text className="text-muted small mb-0">
                                            <strong>Email:</strong> {user.email}
                                        </Card.Text>
                                        <Card.Text className="text-muted small mb-0">
                                            <strong>Mobile:</strong> {user.mobile}
                                        </Card.Text>
                                        <Card.Text className="text-muted small">
                                            <strong>Gender:</strong> {user.gender}
                                        </Card.Text>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <Button
                                        variant="primary"
                                        onClick={() => handleEdit(user)}
                                        className="px-4"
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>

                    ))}
                </Col>
                <Col lg={6} md={6}>
                    <Row>
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Profile Image URL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="profileImage"
                                        value={accountFormData.profileImage}
                                        onChange={handleChange}
                                        placeholder="Enter image URL"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="3">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstname"
                                        value={accountFormData.firstname}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastname"
                                        value={accountFormData.lastname}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Check
                                        label="Male"
                                        name="gender"
                                        type="radio"
                                        value="Male"
                                        checked={accountFormData.gender === "Male"}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        label="Female"
                                        name="gender"
                                        type="radio"
                                        value="Female"
                                        checked={accountFormData.gender === "Female"}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        value={accountFormData.dob}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Country</Form.Label>
                                    <CountrySelect onChange={handleCountryChange} placeHolder="Select Country" />
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>State</Form.Label>
                                    <StateSelect countryid={countryId} onChange={handleStateChange} placeHolder="Select State" />
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>City</Form.Label>
                                    <CitySelect countryid={countryId} stateid={stateId} onChange={handleCityChange} placeHolder="Select City" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Age</Form.Label>    
                                    <Form.Control
                                        type="range"
                                        min="1"
                                        max="100"
                                        name="age"
                                        value={accountFormData.age}
                                        onChange={handleChange}
                                        step="1"
                                        className="range-slider"
                                    />
                                    <Form.Text className="fw-bold">{accountFormData.age} years old</Form.Text>
                                </Form.Group>

                            </Row>
                            <Row>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>@</InputGroup.Text>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={accountFormData.email}
                                            onChange={handleChange}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Mobile No.</Form.Label>
                                    <PhoneInput
                                        international
                                        defaultCountry="IN"
                                        placeholder="Enter Mobile Number"
                                        value={accountFormData.mobile}
                                        onChange={handlePhoneChange}
                                    />
                                </Form.Group>
                            </Row>
                            <Button type="submit" className="mt-4">
                                {editId ? "Update Data" : "Submit Data"}
                            </Button>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default AccountDetails;
