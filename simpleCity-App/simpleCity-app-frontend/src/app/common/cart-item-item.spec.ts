import { CartItemItem } from './cart-item-item';

describe('CartItemItem', () => {
  it('should create an instance', () => {
    // Create an instance of CartItemItem without providing any arguments
    const cartItem = new CartItemItem();

    // Assert that the cartItem instance is truthy (i.e., it was created successfully)
    expect(cartItem).toBeTruthy();
  });
});
