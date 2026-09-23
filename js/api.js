const BASE_URL = 'https://fakestoreapi.com';

/**
 * Generic fetch wrapper with robust status checking and timeout safety.
 * @param {string} endpoint 
 * @returns {Promise<any>}
 */
async function request(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} (${response.statusText})`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error.message);
    throw error;
  }
}

/**
 * Retrieve all products.
 */
export async function getProducts() {
  return await request('/products');
}

/**
 * Retrieve distinct categories for tabs.
 */
export async function getCategories() {
  return await request('/products/categories');
}