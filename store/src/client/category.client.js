const baseUrl =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

export const getCategories = async () => {
  return fetch(`${baseUrl}/category`, {
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
