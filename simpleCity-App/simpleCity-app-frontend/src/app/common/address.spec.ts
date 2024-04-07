import { Address } from './address';

// describe('Address', () => {
//   it('should create an instance', () => {
//     expect(new Address()).toBeTruthy();
//   });
// });

describe('Address', () => {
  it('should create an instance', () => {
    // Provide dummy values for the address fields
    const street = '123 Main St';
    const city = 'City';
    const state = 'State';
    const country = 'Country';
    const zipCode = '12345';

    // Create an instance of Address with the required arguments
    const address = new Address(street, city, state, country, zipCode);

    // Assert that the address instance is truthy (i.e., it was created successfully)
    expect(address).toBeTruthy();
  });
});