import React, { useEffect, useState } from 'react'
import ProductTable from '../../components/Table'
import useGetProducts from '../../hooks/useGetProducts';

const API = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
  
const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await useGetProducts(API);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <ProductTable products= {products} />
    </div>
  )
}

export default Home
