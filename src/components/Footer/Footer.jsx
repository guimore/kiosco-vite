import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaStore, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css';

export const Footer = () => {
  const equipo = [
    { id: 1, nombre: "Guido Amor", rol: "Fundador & Dueño", foto: "https://i.pravatar.cc/150?img=12", linkedin: "#" },
    { id: 2, nombre: "Maria Campos", rol: "Desarrolladora", foto: "https://i.pravatar.cc/150?img=5", linkedin: "#" },
    { id: 3, nombre: "Juan De pablo", rol: "Atención al Cliente", foto: "https://i.pravatar.cc/150?img=3", linkedin: "#" }
  ];

  return (
    // Fondo blanco, borde arriba y sombrita
    <footer className="bg-white text-dark pt-5 pb-4 mt-5 border-top shadow-sm">
      <Container>
        <Row className="gy-4">
          {/* Columna 1: Info del Kiosco */}
          <Col lg={4} md={12}>
            <h4 className="d-flex align-items-center gap-2 fw-bold mb-4 text-primary">
              <FaStore size={28} /> Mi Kiosco
            </h4>
            <p className="text-muted mb-4">
              Tu kiosco de confianza, con todo lo que necesitás. <br />
              Calidad y rapidez en un solo lugar.
            </p>
            <ul className="list-unstyled text-muted">
              <li className="mb-3 d-flex align-items-center gap-3">
                <FaEnvelope className="text-primary" size={18} /> <span>contacto@mikiosco.com</span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-3">
                <FaPhone className="text-primary" size={18} /> <span>+54 11 1234-5678</span>
              </li>
              <li className="d-flex align-items-center gap-3">
                <FaMapMarkerAlt className="text-primary" size={18} /> <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </Col>

          {/* Columna 2: Nuestro Equipo */}
          <Col lg={8} md={12}>
            <h4 className="fw-bold mb-4 text-dark text-center text-lg-start">Nuestro Equipo</h4>
            <Row className="text-center text-lg-start">
              {equipo.map((persona) => (
                <Col sm={4} key={persona.id} className="mb-4">
                  <img 
                    src={persona.foto} 
                    alt={persona.nombre} 
                    className="rounded-circle mb-3 shadow-sm border border-2 border-light" 
                    style={{ width: '90px', height: '90px', objectFit: 'cover' }} 
                  />
                  <h5 className="fw-bold mb-1 text-dark">{persona.nombre}</h5>
                  <p className="text-muted small mb-3">{persona.rol}</p>
                  <div className="d-flex justify-content-center justify-content-lg-start gap-3">
                    <a href={persona.linkedin} className="text-primary text-decoration-none hover-icon">
                      <FaLinkedin size={20} />
                    </a>
                    <a href="#" className="text-primary text-decoration-none hover-icon">
                      <FaGithub size={20} />
                    </a>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Línea divisoria y Copyright */}
        <hr className="border-secondary mt-4 mb-4" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small">
          <p className="mb-2 mb-md-0">© {new Date().getFullYear()} Mi Kiosco. Todos los derechos reservados.</p>
          <p className="mb-0">Hecho con ❤️ en Argentina</p>
        </div>
      </Container>
    </footer>
  );
};