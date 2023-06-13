import { useState } from 'react';

const useDeleteProduct = (apiBaseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);

  const deleteProduct = async (productId, authorId) => {
    setLoading(true);
    setError(null);
    setDeleted(false);

    try {
        const headers = {};
    
        if (authorId) {
            headers["authorId"] = 2;
        }
      // Realiza la llamada a la API para eliminar el producto
      const response = await fetch(`${apiBaseUrl}/products?id=${productId}`, {
        method: 'DELETE',
        headers: {
            'authorId': '2',
          },
      });

      if (response.ok) {
        setDeleted(true);
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleted, deleteProduct };
};

export default useDeleteProduct;
