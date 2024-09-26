import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('https://ls-products-8f76e2d2fc97.herokuapp.com/');
  return response?.data;
};