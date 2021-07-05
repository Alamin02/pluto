const baseUrl = "http://localhost:4000/api/v1";

export const getProducts = async (queryString = "") => {
  return fetch(`${baseUrl}/products?${queryString}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getProduct = async (productId) => {
  return fetch(`${baseUrl}/products/${productId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
