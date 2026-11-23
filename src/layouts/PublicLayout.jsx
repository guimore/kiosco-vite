import { Outlet } from "react-router-dom";
import Layout from "../components/Layout/Layout"; // <-- Usamos TU layout

export const PublicLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};