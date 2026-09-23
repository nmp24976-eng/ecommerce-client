const CART_KEY = 'store_cart_state';

export const storage = {
  getCart() {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Failed to parse cart state from localStorage:', e);
      return [];
    }
  },

  addItem(productId) {
    const cart = this.getCart();
    cart.push(productId);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to write to localStorage:', e);
    }
    return cart;
  },

  getCartCount() {
    return this.getCart().length;
  }
};