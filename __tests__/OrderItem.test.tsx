import React from 'react';
import { render } from '@testing-library/react-native';
import { OrderItem } from '../src/components/OrderItem';

test('display text correctly', () => {
  const item = { id: 1, name: 'Coke', price: '5.50' };
  const { getByTestId } = render(
    <OrderItem item={item} quantity={2} updateQuantity={jest.fn()} />
  );
  expect(getByTestId('product-name-1').props.children).toBe('Coke');
  expect(getByTestId('product-price-1').props.children.join('')).toBe('$11.00');
});
