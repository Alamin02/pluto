const baseUrl = "http://localhost:4000/api/v1";

export const agent = {
  // user
  createUser: (userData, token) => {
    return fetch(`${baseUrl}/users/register`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  },

  getUsers: () => {
    return fetch(`${baseUrl}/users`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  editUser: (userData, token, userId) => {
    return fetch(`${baseUrl}/users/${userId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  },

  deleteUser: (token, userId) => {
    return fetch(`${baseUrl}/users/${userId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },

  // product
  updateProduct: (productId, productData, token) => {
    return fetch(`${baseUrl}/users/products/${productId}`, {
      method: "get",
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
  },

  // category
  getCategories: () => {
    return fetch(`${baseUrl}/category`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  createCategory: (categoryData, token) => {
    return fetch(`${baseUrl}/category`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
  },

  editCategory: (categoryData, token, categoryId) => {
    return fetch(`${baseUrl}/category/${categoryId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
  },

  deleteCategory: (token, categoryId) => {
    return fetch(`${baseUrl}/category/${categoryId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },

  //offer
  createOffer: (offerData, token) => {
    return fetch(`${baseUrl}/offers`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offerData),
    });
  },

  editOffer: (offerData, token, offerId) => {
    return fetch(`${baseUrl}/offers/${offerId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offerData),
    });
  },

  deleteOffer: (token, offerId) => {
    return fetch(`${baseUrl}/offers/${offerId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(offerData),
    });
  },
};
