import { useEffect, useState } from "react";

const useIdValidation = (productId) => {
    const [isIdValid, setIsIdValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const validateId = async () => {
          // Realiza tu solicitud API aquí para validar el ID
          const API_VALIDATE = `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products/verification`;
          const response = await fetch(`${API_VALIDATE}?id=${productId}`, {
              method: "GET",
            });
            const data = await response.json();
            setIsIdValid(data);
            setIsLoading(false);
      };
      validateId();
  }, [productId]);

  return { isIdValid, isLoading };
};
  
  export default useIdValidation;