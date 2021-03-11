const baseUrl = "http://localhost:4000/api/v1";

export const agent = {
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

  editProduct: (productId, productData, token) => {
    return fetch(`${baseUrl}/products/${productId}`, {
      method: "get",
      headers: {
        Authentication: `Bearer ${token}`,
      },
      body: productData,
    });
  },

  createProduct: (productData, token) => {
    return fetch(`${baseUrl}/products`, {
      method: "post",
      headers: {
        Authentication: `Bearer ${token}`,
      },
      body: productData,
    });
  },

  // category
  createCategory: (categoryData, token) => {
    return fetch(`${baseUrl}/category`, {
      method: "post",
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
  },

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
