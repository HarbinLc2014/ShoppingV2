import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import OrderScreen from '../src/screens/OrderScreen';
import { fetchProducts } from '../src/services/api';

// Mock the fetchProducts function
jest.mock('../src/services/api', () => ({
  fetchProducts: jest.fn(),
}));

describe('OrderScreen', () => {
  it('calculates the total price correctly after clicking counter button', async () => {
    // Mock products returned by the fetchProducts function
    const mockProducts = [
      { id: 1, name: 'Coke', price: '5.50' },
      { id: 2, name: 'Pepsi', price: '4.00' },
    ];

    // Mock the API call to return these products
    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

    const { getByTestId } = render(<OrderScreen />);

    // Wait for the products to load and the total to be calculated
    await waitFor(() => {
      // Check if the products are rendered correctly by their testIDs
      expect(getByTestId('product-name-1').props.children).toBe('Coke');
      expect(getByTestId('product-name-2').props.children).toBe('Pepsi');
      expect(getByTestId('product-price-1').props.children.join('')).toBe('$5.50');
      expect(getByTestId('product-price-2').props.children.join('')).toBe('$4.00');
    });

    // Verify that the total is calculated and displayed correctly after products have been loaded
    const totalPrice = (5.50 * 1 + 4.00 * 1).toFixed(2);
    expect(getByTestId('total-price').props.children.join('')).toBe(`$${totalPrice}`);

    // Simulate increasing counter button
    const cokeIncreaseButton = getByTestId('quantity-box-1-plus-button');
    fireEvent.press(cokeIncreaseButton);
    
    await waitFor(() => {
      expect(getByTestId('product-price-1').props.children.join('')).toBe(`$${(5.50*2).toFixed(2)}`); // 5.50 * 2
      // the other price line shouldnt change
      expect(getByTestId('product-price-2').props.children.join('')).toBe(`$${(4.00*1).toFixed(2)}`);
      expect(getByTestId('total-price').props.children.join('')).toBe(`$${(5.50 * 2 + 4.00 * 1).toFixed(2)}`);
    });

    // Simulate decreasing counter button
    const pepsiDecreaseButton = getByTestId('quantity-box-2-minus-button');
    fireEvent.press(pepsiDecreaseButton);
    
    await waitFor(() => {
      expect(getByTestId('product-price-2').props.children.join('')).toBe(`$0.00`);
      expect(getByTestId('product-price-1').props.children.join('')).toBe(`$${(5.50*2).toFixed(2)}`);
      expect(getByTestId('total-price').props.children.join('')).toBe(`$${(5.50 * 2).toFixed(2)}`);
    });
  });

});