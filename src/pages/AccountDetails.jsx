import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useState } from 'react';

function AccountDetails() {
    const [region, setRegion] = useState("");
    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
    const [accountFormData, setAccountFormData] = useState({
        firstname: "",
        lastname: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountFormData({ ...accountFormData, [name]: value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {firstname, lastname} = accountFormData;
        let res =  await fetch("https://newonlineshop-d607a-default-rtdb.firebaseio.com/accountdetailsform.json",{
            method:"POST",
            header:{
                ContentType : "Onlineshopingdata"
            },
            body: JSON.stringify({
                firstname,
                lastname,
            })
        });
        if( res ){
            alert("Data Stored")    
        }else{
            alert("please fill data")
        }
    }
    
    return (

        <>
            <Container>
                <Row>
                    <Form noValidate onSubmit={handleSubmit}>
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
                                <Form.Label >Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastname"
                                    value={accountFormData.lastname}
                                    onChange={handleChange}
                                    
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="2" controlId="validationFormik02">
                                <Form.Label >Gender :</Form.Label>
                                <div className='d-block'>
                                    <Form.Check
                                        inline
                                        label="Male"
                                        name="group1"
                                        type="radio"
                                        className={"ms-2"}
                                    />
                                    <Form.Check
                                        inline
                                        label="Female"
                                        name="group1"
                                        type="radio"
                                    />
                                </div>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationFormik05">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="date of birth"
                                    name="date"
                                    // value={accountFormData.zip}
                                    onChange={handleChange}
                                // isInvalid={!!errors.zip}
                                />
                            </Form.Group>

                        </Row>
                        <Row>
                            {/* React Contry Select */}
                            <Form.Group as={Col} xxl="3" xl="3" md="3" sm="3" xs="3" controlId="validationFormik05">
                                <Form.Label>Country</Form.Label>
                                <CountrySelect
                                    onChange={(e) => {
                                        setCountryid(e.id);
                                    }}
                                    placeHolder="Select Country"
                                    region={region}
                                />
                            </Form.Group>
                            <Form.Group as={Col} xxl="3" xl="3" md="3" sm="3" xs="3" controlId="validationFormik05">
                                <Form.Label>State</Form.Label>
                                <StateSelect
                                    countryid={countryid}
                                    onChange={(e) => {
                                        setstateid(e.id);
                                    }}
                                    placeHolder="Select State"
                                />
                            </Form.Group>

                            <Form.Group as={Col} xxl="3" xl="3" md="3" sm="3" xs="3" controlId="validationFormik05">
                                <Form.Label>City</Form.Label>
                                <CitySelect
                                    countryid={countryid}
                                    stateid={stateid}
                                    onChange={(e) => {
                                        console.log(e);
                                    }}
                                    placeHolder="Select City"
                                />
                            </Form.Group>
                            <Form.Group as={Col} xxl="3" xl="3" md="3" sm="3" xs="3" controlId="validationFormi2" className="d-block">
                                <Form.Label className="d-block" >Instated In :</Form.Label>
                                <Form.Check
                                    inline
                                    label="Local Brands"
                                    name="group1"
                                    type="checkbox"
                                    className={"ms-2"}
                                />
                                <Form.Check
                                    inline
                                    label="Regular Brands"
                                    name="group1"
                                    type="checkbox"
                                />
                                <Form.Check
                                    className="ms-2"
                                    inline
                                    label="Luxury Brands"
                                    name="group1"
                                    type="checkbox"
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} md="3" controlId="validationFormikemail03">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        placeholder="abc@gmail.com"
                                        aria-describedby="inputGroupPrepend"
                                        name="Email"
                                        value={accountFormData.email}
                                        onChange={handleChange}
                                    />

                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} md="3" controlId="validationFormik05" >
                                <Form.Label>Mobile No.</Form.Label>
                                <PhoneInput
                                    international
                                    defaultCountry="IN"
                                    placeholder="Enter Mobile Number"
                                    name="mobile-no"
                                    // value={accountFormData.zip}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Row>
                        &nbsp;
                        <Form.Group as={Col} md="3" controlId="validationFormik05">
                            <Form.Check
                                required
                                name="terms"
                                label="Agree to terms and conditions"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button type="submit" className="mt-4">Submit form</Button>
                    </Form>
                </Row>
            </Container >
        </>

    );
}

export default AccountDetails;