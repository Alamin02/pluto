const baseUrl = "http://localhost:4000/api/v1";

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
