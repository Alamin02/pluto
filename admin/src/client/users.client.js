const baseUrl = "http://localhost:4000/api/v1";

export const createUser = async (userData, token) => {
  return fetch(`${baseUrl}/auth/register`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const getUsers = async (token) => {
  return fetch(`${baseUrl}/users`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editUser = async (userData, token, userId) => {
  return fetch(`${baseUrl}/users/${userId}`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const deleteUser = async (token, userId) => {
  return fetch(`${baseUrl}/users/${userId}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
