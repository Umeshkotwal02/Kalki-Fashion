// React Router
// Step-1 : install react :- npm i react-router-dom
// Step-2 : import  createBrowserRouter and create router function with array
//        : In that function path("/home") and element (component)
// Step-3 : To Fit Component we use RouterProvider 
// Step-4 : giv path to Nav.Link or anchor tag href="/home"
// Step-5 : to page not reload we use Link replace to anchor tag <a>, and href="" then we 

// - useNavigate to change Page

// App.js
import './App.css';
import NavbarMain from './components/NavbarMain';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Women from './pages/Women';
import Men from './pages/Men';
import Bridal from './pages/Bridal';

import './App.css';
import NavbarMain from './components/NavbarMain';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from './components/toaster';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Women from './pages/Women';
import Men from './pages/Men';
import Bridal from './pages/Bridal';


// Mostly we do this in Index.jsx
function App() {

    const router = createBrowserRouter([
        {
            path: "/women",
            element: <><NavbarMain /><Women /></>
        },
        {
            path: "/men",
            element: <><NavbarMain /><Men /></>
        },
        {
            path: "/bridal",
            element: <><NavbarMain /><Bridal /></>
        },
        {
            path: "/luxe",
            element: <><NavbarMain /><Luxe /></>
        }
    ])
    return (
        <>
            <Toaster />
            {/* <NavbarMain /> */}
            <RouterProvider router={router} />
        </>

    );
};

export default App;



// Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarMain = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Nav className="justify-content-around flex-grow-1 fw-bold">
                <Nav.Link as={Link} to="/women" className="text-dark">Women</Nav.Link>
                <Nav.Link as={Link} to="/men" className="text-dark">Men</Nav.Link>
                <Nav.Link as={Link} to="/bridal" className="text-dark">Bridal</Nav.Link>
                <Nav.Link as={Link} to="/luxe" className="text-dark">Luxe</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default NavbarMain;


//  Anchor Tag
<Link to="/home"></Link>
