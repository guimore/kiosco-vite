import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';
import Spinner from '../Spinner/Spinner';
import { getProductById } from '../../services/productsService';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    
    getProductById(id)
      .then((producto) => {
        setSelectedItem(producto);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
      });
  }, [id]);

  // 1. Si está cargando, mostramos el Spinner
  if (load) return <Spinner />;

  // 2. Si el producto no existe (o Firebase devolvió null), mostramos este mensaje
  if (!selectedItem) return <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Producto no encontrado</h2>;

  // 3. Si todo está bien, mostramos el detalle
  return <ItemDetail item={selectedItem} />;
};

export default ItemDetailContainer;