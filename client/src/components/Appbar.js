import React, { useContext } from "react";
import { Navbar, Nav, Form, Container, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";

const Appbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const { isloggedIn, setIsLoggedIn } = useContext(NoteContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsLoggedIn(false);
  };

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container fluid>
      <Link className="navbar-brand mx-0" to='/'>
        <Navbar.Brand>iNoteBook</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: "100px" }} navbarScroll>
            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to='/'>
              Home
            </Link>
            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to='/about'>
              About
            </Link>
          </Nav>
          {isloggedIn ? (
            <Button variant='outline-light' className='mx-2' onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Form className='d-flex'>
              <Link className='btn btn-outline-light mx-2' to='/login'>
                Login
              </Link>
              <Link className='btn btn-outline-light mx-2' to='/register'>
                Sign up
              </Link>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Appbar;
