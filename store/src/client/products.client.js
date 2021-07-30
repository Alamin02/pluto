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

export const getProduct = async (productId) => {
  return fetch(`${baseUrl}/products/${productId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getCategoryProducts = async (categoryId) => {
  return fetch(`${baseUrl}/category/${categoryId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
