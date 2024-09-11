export const getProductsByIds = (cart, products) => {
  const cartProducts = cart.map(cartItem => {
    const product = products.find(product => product._id === cartItem._id);
    if (product) {
      const updatedQuantity = Math.min(cartItem.quantity, product.stock);
      return {
        ...cartItem,
        ...product,
        quantity: updatedQuantity,
      };
    }
    return null;
  }).filter(item => item !== null);

  const outOfStockProducts = cartProducts.filter(item => item.quantity === 0);
  const availableProducts = cartProducts.filter(item => item.quantity > 0);

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cartProducts));

  return { availableProducts, outOfStockProducts };
};
