import React from 'react';

const ProductTable = ({ products }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Logo</th>
          <th>Nombre del producto</th>
          <th>Descripción</th>
          <th>Fecha de liberación</th>
          <th>Fecha de reestructuración</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default App;