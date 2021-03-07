const baseUrl = "http://localhost:4000/api/v1";

export const agent = {
  createUser: (userData, token) => {
    return fetch(`${baseUrl}/users/register`, {
      method: "post",
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  },

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
};
