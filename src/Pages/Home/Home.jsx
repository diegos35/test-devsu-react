import React from 'react'
import ProductTable from '../../components/Table'

function Home() {
  const products = [
    {
      "id": 1,
      "logo": "logo1.jpg",
      "nombre": "Producto 1",
      "descripcion": "Descripción del Producto 1",
      "fechaLiberacion": "2023-01-01",
      "fechaRestructuracion": "2023-02-01"
    },
    {
      "id": 2,
      "logo": "logo2.jpg",
      "nombre": "Producto 2",
      "descripcion": "Descripción del Producto 2",
      "fechaLiberacion": "2023-03-01",
      "fechaRestructuracion": "2023-04-01"
    },
    {
      "id": 3,
      "logo": "logo3.jpg",
      "nombre": "Producto 3",
      "descripcion": "Descripción del Producto 3",
      "fechaLiberacion": "2023-05-01",
      "fechaRestructuracion": "2023-06-01"
    }
  ];

  return (
    <div>
      <ProductTable products= {products} />
    </div>
  )
}

export default Home
