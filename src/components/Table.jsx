import React, { useState } from 'react';
import '../styles/Table.css';

const ProductTable = ({ products }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleEdit = (productId) => {
    // Lógica para editar el producto con el ID proporcionado
    console.log(`Editar producto con ID: ${productId}`);
  };

  const handleDelete = (productId) => {
    // Lógica para eliminar el producto con el ID proporcionado
    console.log(`Eliminar producto con ID: ${productId}`);
  };

  const toggleMenu = (productId) => {
    console.log( activeMenu, productId)
    if (activeMenu === productId) {
      setActiveMenu(null);
    } else {
      setActiveMenu(productId);
    }
  };

  return (
    <div>
      <table>
      <thead>
        <tr colSpan="5">
          <th>Logo</th>
          <th>Nombre del producto</th>
          <th>Descripción</th>
          <th>Fecha de liberación</th>
          <th>Fecha de reestructuración</th>
          <th class="menu-column"></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td><img src={product.logo} alt={product.nombre} /></td>
            <td>{product.nombre}</td>
            <td>{product.descripcion}</td>
            <td>{product.fechaLiberacion}</td>
            <td>{product.fechaRestructuracion}</td>
            <td>
              <div className="menu" onClick={() => toggleMenu(product.id)}>
                <span className="icon">...</span>
                {activeMenu === product.id && (
                  <div className="menu-content">
                    <div 
                      className="menu-item" 
                      onClick={() => handleEdit(product.id)}
                    >
                        Editar
                    </div>
                    <div 
                      className="menu-item" 
                      onClick={() => handleDelete(product.id)}
                    >
                        Eliminar
                    </div>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
      <p className='total-elements'> {products.length} Resultados</p>
    </div>
  );
};



export default ProductTable;