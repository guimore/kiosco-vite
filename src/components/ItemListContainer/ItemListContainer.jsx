import React, { useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList'; 
import Spinner from '../Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { getProducts, getByCategory } from '../../services/productsService'; 
import { Helmet } from 'react-helmet-async';
import { Form, InputGroup, Pagination } from 'react-bootstrap'; // <-- Agregamos Pagination
import { FaSearch } from 'react-icons/fa'; 
import styled from 'styled-components'; // <-- NUEVO

// 1. Creamos el título estilizado (Requerimiento #3)
const SectionTitle = styled.h2`
  text-align: center;
  color: #2c3e50;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [load, setLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setLoad(true);
    setCurrentPage(1); 
    
    const fetchData = categoryId ? getByCategory(categoryId) : getProducts();

    fetchData
      .then((data) => {
        setItems(data);
        setLoad(false);
      })
      .catch((err) => {
        console.error("Error al traer productos:", err);
        setLoad(false);
      });
  }, [categoryId]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>{categoryId ? `Categoría: ${categoryId}` : 'Productos'} | Mi Kiosco</title>
      </Helmet>

      {/* 2. Usamos el título estilizado */}
      <SectionTitle>Nuestros Productos</SectionTitle>

      {/* BARRA DE BÚSQUEDA */}
      <div className="container-fluid px-4 mt-2">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <InputGroup className="mb-4 shadow-sm">
              <InputGroup.Text className="bg-white border-end-0">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar producto..."
                className="border-start-0"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }} 
              />
            </InputGroup>
          </div>
        </div>
      </div>

      {/* LISTA DE PRODUCTOS */}
      {load ? (
        <Spinner />
      ) : filteredItems.length === 0 ? (
        <div className="text-center mt-5">
          <h4 className="text-muted">No se encontraron productos con ese nombre.</h4>
        </div>
      ) : (
        <>
          <ItemList data={currentItems} />

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5 mb-4">
              <Pagination>
                <Pagination.Prev 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1} 
                />
                
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages} 
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ItemListContainer;