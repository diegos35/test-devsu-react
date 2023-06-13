import {useEffect, useState} from 'react';

const useGetProducts = async (API) =>{
    try {
        const response = await fetch(API, {
          headers: {
            'authorId': '2'
          }
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Error al obtener los productos');
      }
    };
    
export default useGetProducts;



