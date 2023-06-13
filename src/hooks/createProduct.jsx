import { useState } from "react";

const useApiRequest = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendRequest = (method, requestData, authorId) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const headers = {
        "Content-Type": "application/json",
    };

    if (authorId) {
        headers["authorId"] = authorId;
    }

    const formattedRequestData = {
        ...requestData,
        date_release: new Date(requestData.date_release).toISOString(),
        date_revision: new Date(requestData.date_revision).toISOString(),
      };
    
    fetch(url, {
      method: method,
      headers:headers,
      body: JSON.stringify(formattedRequestData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        setIsLoading(false);
        setData(responseData);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message || "Something went wrong");
      });
  };

  return { isLoading, error, data, sendRequest };
};

export default useApiRequest;