const baseUrl = "http://localhost:4000/api/v1";

export const getProducts = async (queryString = "") => {
  return fetch(`${baseUrl}/products?${queryString}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// create product
export const createProduct = async (productData, token) => {
  return fetch(`${baseUrl}/products`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: productData,
  });
};

// edit product
export const editProduct = async (productId, productData, token) => {
  return fetch(`${baseUrl}/products/${productId}`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
};

// delete product
export const deleteProduct = async (productId, token) => {
  return fetch(`${baseUrl}/products/${productId}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProductImage = async (imageId) => {
  return fetch(`${baseUrl}/images/${imageId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createProductImage = async (data) => {
  return fetch(`${baseUrl}/images/`, {
    method: "post",
    body: data,
  });
};

export const deleteProductImage = async (imageId) => {
  return fetch(`${baseUrl}/images/${imageId}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
