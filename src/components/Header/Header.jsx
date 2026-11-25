import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaStore } from 'react-icons/fa';
import "./Header.css";

export const Header = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3 sticky-top">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fs-4 fw-bold text-dark">
          <FaStore className="text-primary" size={30} />
          Mi Kiosco
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3 mt-3 mt-lg-0">
            <Nav.Link as={NavLink} to="/" className="text-dark fw-bold">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos" className="text-dark fw-bold">
              Productos
            </Nav.Link>
            
            {/* Botón Carrito con colores forzados */}
            <Nav.Link 
              as={NavLink} 
              to="/carrito" 
              className="btn d-flex align-items-center gap-2 px-4 py-2 rounded-pill shadow-sm text-nowrap"
              style={{ backgroundColor: '#0d6efd', color: 'white', fontWeight: 'bold' }}
            >
              <FaShoppingCart /> Carrito
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};