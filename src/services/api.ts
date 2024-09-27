import axios from 'axios';
import { Product } from '../types/Product';

const isProduct = (data: any): data is Product => {
    return (
      typeof data.id === 'number' &&
      typeof data.name === 'string' &&
      typeof data.price === 'string'
    );
  };
  
  const isProductArray = (data: any): data is Product[] => {
    return Array.isArray(data) && data.every(isProduct);
  };

export const fetchProducts = async () => {
    const response = await axios.get('https://ls-products-8f76e2d2fc97.herokuapp.com/');
    // Use the type guard to validate the response data
    if (!isProductArray(response.data)) {
      throw new Error('Sorry we are currently experiencing an ongoing issue. Please try again later.');
    }
    return response.data;
};