import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import QuantityBox from '../src/components/QuantityBox';

describe('QuantityBox', () => {
  it('updates the quantity correctly when buttons are pressed', () => {
    const setQuantity = jest.fn();
    const { getByTestId } = render(
      <QuantityBox quantity={2} setQuantity={setQuantity} testID="quantity-box" />
    );

    const increaseButton = getByTestId('quantity-box-plus-button');
    const decreaseButton = getByTestId('quantity-box-minus-button');
    const input = getByTestId('quantity-box-input');

    // Simulate pressing the increase button
    fireEvent.press(increaseButton);
    expect(setQuantity).toHaveBeenCalledWith(3);

    // Simulate pressing the decrease button
    fireEvent.press(decreaseButton);
    expect(setQuantity).toHaveBeenCalledWith(1);

    // Simulate changing the text input
    fireEvent.changeText(input, '5');
    expect(setQuantity).toHaveBeenCalledWith(5);
  });
});