import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import UserContext from "../context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/">J-Movie</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {user.id !== null ? (
                            <>
                                <Nav.Link as={NavLink} to="/movies">Movies</Nav.Link>
                                <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}