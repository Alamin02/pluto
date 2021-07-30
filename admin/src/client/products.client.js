const baseUrl =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

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
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
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
  return fetch(`${baseUrl}/product-images/${imageId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteProductImage = async (imageId, token) => {
  return fetch(`${baseUrl}/product-images/${imageId}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
