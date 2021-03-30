const baseUrl = "http://localhost:4000/api/v1";

export const agent = {
  // product
  getProducts: (queryString = "") => {
    return fetch(`${baseUrl}/products${queryString}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  getProduct: (productId) => {
    return fetch(`${baseUrl}/products/${productId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  getBlogs: () => {
    return fetch(`${baseUrl}/blogs`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  getCategories: () => {
    return fetch(`${baseUrl}/category`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
