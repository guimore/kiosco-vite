import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Modal } from "react-bootstrap"; 
import { FaEdit, FaTrash } from "react-icons/fa"; 
import { getProducts, deleteProduct } from "../../services/productsService";
import { Helmet } from 'react-helmet-async'; // <-- NUEVO

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error al traer productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleShowModal = (id) => {
    setProductToDelete(id); 
    setShowModal(true);     
  };

  const handleCloseModal = () => {
    setShowModal(false);    
    setProductToDelete(null); 
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productToDelete);
      fetchProducts(); 
      handleCloseModal(); 
    } catch (error) {
      alert("Error al eliminar el producto");
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Cargando productos...</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      {/* TÍTULO DINÁMICO PARA EL ADMIN */}
      <Helmet>
        <title>Gestión de Productos | Admin - Mi Kiosco</title>
      </Helmet>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>Gestión de Productos</h2>
        <Link to="/admin/dashboard" className="btn btn-secondary">Volver al Panel</Link>
      </div>
      
      <Table striped bordered hover responsive className="bg-white shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="4" className="text-center py-4">No hay productos cargados.</td></tr>
          ) : (
            products.map((prod) => (
              <tr key={prod.id} className="align-middle">
                <td>
                  <img src={prod.image} alt={prod.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
                </td>
                <td>{prod.name}</td>
                <td>${prod.price}</td>
                <td className="text-center">
                  <Button 
                    variant="warning" 
                    size="sm" 
                    className="me-2 d-inline-flex align-items-center gap-1" 
                    onClick={() => navigate(`/admin/products/edit/${prod.id}`)}
                  >
                    <FaEdit /> Editar
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    className="d-inline-flex align-items-center gap-1"
                    onClick={() => handleShowModal(prod.id)} 
                  >
                    <FaTrash /> Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que querés eliminar este producto? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Sí, eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};