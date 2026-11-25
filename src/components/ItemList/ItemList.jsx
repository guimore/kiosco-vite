import React from 'react';
import Item from '../Item/Item';
import './ItemList.css';

const ItemList = ({ data }) => {
    return (
        <div className='container-fluid px-4 py-4'>
            <div className='row g-4 justify-content-center align-items-stretch'>
                {data.map((i) => (
                    <Item 
                        key={i.id} 
                        id={i.id} 
                        name={i.name} 
                        image={i.image} 
                        price={i.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default ItemList;