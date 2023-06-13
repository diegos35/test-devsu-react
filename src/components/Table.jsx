import React, { useEffect, useState } from "react";
import "../styles/Table.css";
import { Link } from "react-router-dom";
import useDeleteProduct from "../hooks/useDeleteProduct";

const ProductTable = ({ products }) => {
  console.log(products);
  const [activeMenu, setActiveMenu] = useState(null);
  const { loading, error, deleted,isDeleted, deleteProduct } = useDeleteProduct(
    "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp",
    2
  ); 
  const [productList, setProductList] = useState(products);


  const handleEdit = (productId) => {
    console.log(`Editar producto con ID: ${productId}`);
  };

  
  const handleDelete = async(productId) => {
     try {
      await deleteProduct(productId);
      setProductList(productList.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error al eliminar el producto', error);
    }
  };

  const toggleMenu = (productId) => {
    console.log(activeMenu, productId);
    if (activeMenu === productId) {
      setActiveMenu(null);
    } else {
      setActiveMenu(productId);
    }
  };

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    if (isDeleted) {
      const updatedProducts = productList.filter((product) => product.id !== deleted);
      setProductList(updatedProducts);
    }
  }, [isDeleted, deleted, productList]);

  return (
    <div>
      <div className="table-header">
        <Link to="/form" className="add-button ">
          Agregar
        </Link>{" "}
      </div>{" "}
      <table>
        <thead>
          <tr colSpan="5">
            <th> Logo</th>
            <th> Nombre del producto</th>
            <th>
              {" "}
              Descripción
              <span className="circle">
                <span className="exclamation">¡</span>
              </span>
            </th>
            <th>
              {" "}
              Fecha de liberación
              <span className="circle">
                <span className="exclamation">¡</span>
              </span>
            </th>
            <th>
              {" "}
              Fecha de reestructuración
              <span className="circle">
                <span className="exclamation">¡</span>
              </span>
            </th>
            <th className="menu-column"></th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.logo} alt={product.nombre} />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.date_release}</td>
              <td>{product.date_revision}</td>
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
      <p className="total-elements"> {products.length} Resultados</p>
    </div>
  );
};

export default ProductTable;
