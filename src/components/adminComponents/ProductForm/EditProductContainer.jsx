import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../../utils/validateProduct";
import { uploadImage } from "../../../services/uploadImage";
import { getProductById, updateProduct } from "../../../services/productsService";
import "./ProductFormContainer.css";

export const EditProductContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "", // Guardamos la URL de la imagen vieja
  });

  // Traemos los datos del producto cuando carga la página
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      if (data) {
        setProduct({
          name: data.name,
          price: data.price,
          category: data.category,
          description: data.description,
          image: data.image, // Imagen actual
        });
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // Validamos (le pasamos el producto y el archivo)
    const newErrors = validateProduct({ ...product, file });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      let finalImageUrl = product.image; // Por defecto usamos la que ya estaba

      // Si el usuario subió una foto nueva, la subimos a ImgBB
      if (file) {
        finalImageUrl = await uploadImage(file);
      }

      const productData = {
        name: product.name,
        price: Number(product.price),
        category: product.category,
        description: product.description,
        image: finalImageUrl,
      };

      // Actualizamos en Firebase
      await updateProduct(id, productData);

      // Volvemos a la tabla de productos
      navigate("/admin/products");
    } catch (error) {
      console.error("Error al editar:", error);
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductFormUI
      product={product}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
    />
  );
};