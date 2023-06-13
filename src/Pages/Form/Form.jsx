import React, { useEffect, useState } from "react";
import "../../styles/Form.css";
import useApiRequest from "../../hooks/createProduct";
import { useLocation, useNavigate } from "react-router-dom";



function Form() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [logo, setLogo] = useState("");
  const [fechaLiberacion, setFechaLiberacion] = useState("");
  const [fechaRevision, setFechaRevision] = useState("");
  const [formErrors, setFormErrors] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    logo: "",
    fechaLiberacion: "",
    fechaRevision: ""
  });
  const URLCREATE = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products";
  const { sendRequest } = useApiRequest(URLCREATE);
  const [ setSuccessMessage] = useState(false);

  const location = useLocation();
  const selectedProduct = location.state?.product;
  const isEditing = !!selectedProduct; 
  
  useEffect(() => {
    if (selectedProduct) {
      setId(selectedProduct.id);
      setNombre(selectedProduct.name);
      setDescripcion(selectedProduct.description);
      setLogo(selectedProduct.logo);
      
      const fechaLiberacionISO = selectedProduct.date_release;
      const fechaLiberacion = fechaLiberacionISO.split("T")[0];
      setFechaLiberacion(fechaLiberacion);
      
      const fechaRevisionISO = selectedProduct.date_release;
      const fechaRevision = fechaRevisionISO.split("T")[0];
      setFechaRevision(fechaRevision);
    }
  }, [selectedProduct]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Construir el objeto de datos del formulario
    console.log(isEditing)
    const formData = {
      id: id,
      name: nombre,
      description: descripcion,
      logo: logo,
      date_release: fechaLiberacion,
      date_revision: fechaRevision,
    };
    if(isEditing){
      sendRequest("PUT", formData, 2)
    }else {
      sendRequest("POST", formData, 2)
      navigate("/"); // Redireccionar a la ruta "/tabla" después de guardar
    }
    
  };
  
  const handleReset = () => {
    setId("");
    setNombre("");
    setDescripcion("");
    setLogo("");
    setFechaLiberacion("");
    setFechaRevision("");
    const [formErrors, setFormErrors] = useState({
      id: "",
      nombre: "",
      descripcion: "",
      logo: "",
      fechaLiberacion: "",
      fechaRevision: ""
    });
    
  };

  const handleFechaLiberacionChange = (e) => {
    const liberacion = e.target.value;
    setFechaLiberacion(liberacion);
    const liberacionDate = new Date(liberacion);
    const revisionDate = new Date(liberacionDate.getTime());
    revisionDate.setFullYear(revisionDate.getFullYear() + 1);
    const formattedRevisionDate = revisionDate.toISOString().split("T")[0];
    setFechaRevision(formattedRevisionDate);
    validateForm();
  };

  const validateForm = () => {
    const errors = {
      id: "",
      nombre: "",
      descripcion: "",
      logo: "",
      fechaLiberacion: "",
      fechaRevision: ""
    };

    // Validar campo ID si se está creando un nuevo producto
      if (!isEditing && (!id || id.length < 3 || id.length > 10)) {
        errors.id = "El ID debe tener entre 3 y 10 caracteres";
      }
  

    // Validar campo Nombre
    if (!nombre) {
      errors.nombre = "Campo requerido";
    } else if (nombre.length < 5 || nombre.length > 100) {
      errors.nombre = "El nombre debe tener entre 5 y 100 caracteres";
    }

    // Validar campo Descripcion
    if (!descripcion) {
      errors.descripcion = "Campo requerido";
    } else if (descripcion.length < 10 || descripcion.length > 200) {
      errors.descripcion = "La descripción debe tener entre 10 y 200 caracteres";
    }

    // Validar campo Logo
    if (!logo) {
      errors.logo = "Campo requerido";
    }

    // Validar campo Fecha de liberación
    if (!fechaLiberacion) {
      errors.fechaLiberacion = "Campo requerido";
    } else {
      const fechaLiberacionDate = new Date(fechaLiberacion);
      const currentDate = new Date();
      if (fechaLiberacionDate < currentDate) {
        errors.fechaLiberacion = "La fecha debe ser igual o mayor a la fecha actual";
      }
    }

    // Validar campo Fecha de Revisión
    if (!fechaRevision) {
      errors.fechaRevision = "Campo requerido";
    }

    setFormErrors(errors);
  };

  const isFormValid = () => {
    return Object.values(formErrors).every((error) => error === "");
  };

  return (
    <div>
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onBlur={validateForm}
              disabled={isEditing} //Deshabilitar cuando hay un valor en 'id'
            />
            {formErrors.id && <span className="error">{formErrors.id}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onBlur={validateForm}
            />
            {formErrors.nombre && <span className="error">{formErrors.nombre}</span>}
          </div>
        </div>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              onBlur={validateForm}
            />
            {formErrors.descripcion && <span className="error">{formErrors.descripcion}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="logo">Logo</label>
            <input
              type="text"
              id="logo"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              onBlur={validateForm}
            />
            {formErrors.logo && <span className="error">{formErrors.logo}</span>}
          </div>
        </div>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="fecha_liberacion">Fecha de liberación</label>
            <input
              type="date"
              id="fecha_liberacion"
              value={fechaLiberacion}
              
              onChange={handleFechaLiberacionChange}
              onBlur={validateForm}
            />
            {formErrors.fechaLiberacion && <span className="error">{formErrors.fechaLiberacion}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="fecha_revision">Fecha de Revisión</label>
            <input
              type="text"
              id="fecha_revision"
              value={fechaRevision}
              disabled
            />
            {formErrors.fechaRevision && <span className="error">{formErrors.fechaRevision}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleReset}>
            Reiniciar
          </button>
          <button type="submit" disabled={!isFormValid()}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
