const baseUrl = "http://localhost:4000/api/v1";

// category
export const getCategories = async () => {
  return fetch(`${baseUrl}/category`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createCategory = async (categoryData, token) => {
  return fetch(`${baseUrl}/category`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });
};

export const editCategory = async (categoryData, token, categoryId) => {
  return fetch(`${baseUrl}/category/${categoryId}`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });
};

export const deleteCategory = async (token, categoryId) => {
  return fetch(`${baseUrl}/category/${categoryId}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
