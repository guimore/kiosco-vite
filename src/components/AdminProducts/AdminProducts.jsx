import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/productsService";

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que querés eliminar este producto?")) {
      try {
        await deleteProduct(id);
        // Volvemos a pedir la lista para que el producto desaparezca de la pantalla
        fetchProducts(); 
      } catch (error) {
        alert("Error al eliminar el producto");
      }
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Cargando productos...</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>Gestión de Productos</h2>
        <Link to="/admin/dashboard" className="btn btn-secondary">Volver al Panel</Link>
      </div>
      
      <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <thead style={{ background: "#f4f4f4" }}>
          <tr>
            <th style={{ padding: "1rem", textAlign: "left" }}>Imagen</th>
            <th style={{ padding: "1rem", textAlign: "left" }}>Nombre</th>
            <th style={{ padding: "1rem", textAlign: "left" }}>Precio</th>
            <th style={{ padding: "1rem", textAlign: "center" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="4" style={{ padding: "1rem", textAlign: "center" }}>No hay productos cargados.</td></tr>
          ) : (
            products.map((prod) => (
              <tr key={prod.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "1rem" }}>
                  <img src={prod.image} alt={prod.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
                </td>
                <td style={{ padding: "1rem" }}>{prod.name}</td>
                <td style={{ padding: "1rem" }}>${prod.price}</td>
                <td style={{ padding: "1rem", textAlign: "center" }}>
                  {/* El botón editar lo dejamos para después, por ahora te lleva al form */}
                  <button 
                    onClick={() => navigate(`/admin/products/edit/${prod.id}`)} 
                    style={{ marginRight: "10px", padding: "0.5rem", cursor: "pointer" }}>
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(prod.id)} 
                    style={{ padding: "0.5rem", cursor: "pointer", color: "red" }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};