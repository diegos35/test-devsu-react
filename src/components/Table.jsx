import React, { createRef, useEffect, useState } from "react";
import "../styles/Table.css";
import { Link, createPath, useNavigate } from "react-router-dom";
import useDeleteProduct from "../hooks/useDeleteProduct";

const ProductTable = ({ products }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [productList, setProductList] = useState(products);
  const [pageSize, setPageSize] = useState(5); // Tamaño de página seleccionado
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);

  const API_DELETE =
    "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp";

  const { deleted, isDeleted, deleteProduct } =
    useDeleteProduct(API_DELETE, 2);

  const navigate = useNavigate(); 

  const handleEdit = (productId) => {
    // Encuentra el producto seleccionado
    const selectedProduct = productList.find(
      (product) => product.id === productId
    );
    // Redirige al formulario de edición y pasa el producto seleccionado como estado
    navigate("/form", { state: { product: selectedProduct } });
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProductList(productList.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  const toggleMenu = (productId) => {
    if (activeMenu === productId) {
      setActiveMenu(null);
    } else {
      setActiveMenu(productId);
    }
  };

  const handlePageSizeChange = (event) => {
    console.log(event.target.value)
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
  };

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    if (isDeleted) {
      const updatedProducts = productList.filter(
        (product) => product.id !== deleted
      );
      setProductList(updatedProducts);
    }
  }, [isDeleted, deleted, productList]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const slicedProducts = productList.slice(startIndex, endIndex);
    setPaginatedProducts(slicedProducts);
  }, [productList, currentPage, pageSize]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", options);
  }
  

  return (
    <div>
      <div className="table-header">
        <Link to="/form" className="add-button">
          Agregar
        </Link>
      </div>
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
          {paginatedProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.logo} alt={product.nombre} />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{new Date(product.date_release).toLocaleDateString()}</td>
              <td>{new Date(product.date_revision).toLocaleDateString()}</td>
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
      <div className="footer">
      <p className="total-elements"> {paginatedProducts.length} Resultados</p>
      <select className="select" value={pageSize} onChange={handlePageSizeChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
      </select>
      </div>
    </div>
  );
};

export default ProductTable;
