const baseUrl = "http://localhost:4000/api/v1";

export const agent = {
  // product
  getProducts: (queryString = "") => {
    return fetch(`${baseUrl}/products?${queryString}`, {
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
  getMe: (token) => {
    return fetch(`${baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  getSingleUser: (userId) => {
    return fetch(`${baseUrl}/users/${userId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  createOrder: (orderData, token) => {
    return fetch(`${baseUrl}/orders`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
  },

  createUserImage: (data) => {
    return fetch(`${baseUrl}/profile`, {
      method: "post",
      body: data,
    });
  },
};
