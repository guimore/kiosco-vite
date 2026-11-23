import { Outlet } from "react-router-dom";
import Layout from "../components/Layout/Layout"; // <-- Usamos TU layout también acá

export const AdminLayout = () => {
  return (
    <Layout>
      <div style={{ padding: '2rem', minHeight: '60vh' }}>
        <Outlet /> {/* Acá se van a cargar el Dashboard y el Formulario */}
      </div>
    </Layout>
  );
};