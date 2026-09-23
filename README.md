# 🛍️ Dynamic Storefront - Modular RESTful API Client

A responsive, high-performance web storefront built with modern vanilla JavaScript (ES6+), featuring dynamic DOM manipulation, real-time client-side search/filter logic, asynchronous REST API integration, and local state persistence.

---

## ✨ Features

- **Asynchronous Data Fetching**: Retrieves real-time catalog data using the native `fetch` API with `async`/`await` from [FakeStoreAPI](https://fakestoreapi.com/).
- **Dynamic DOM Manipulation**:
  - **Live Search**: Instant keyword filtering across product titles without page reloads.
  - **Category Tabs**: Switch between product categories smoothly.
  - **Sorting**: Multi-parameter sorting (Price: Low to High, High to Low, Rating).
- **Client-Side State Persistence**: Utilizes `localStorage` to cache shopping cart items across sessions.
- **Robust UX & Error Handling**:
  - CSS-driven skeleton loader animations during data resolution.
  - User-friendly error banners on network/API failure.
- **Modular Architecture**: Clean separation of concerns across ES6 modules (`api.js`, `storage.js`, `app.js`).

---

## 📁 Project Structure

```text
ecommerce-client/
├── index.html        # HTML5 layout, controls toolbar, & product grid container
├── styles.css        # Responsive CSS grid, animations, and skeleton styling
├── js/
│   ├── api.js        # API service layer (fetch calls & network error handling)
│   ├── storage.js    # LocalStorage management (cart state persistence)
│   └── app.js        # Main controller (event listeners, state, DOM rendering)
└── README.md         # Project documentation"# ecommerce-client" 
