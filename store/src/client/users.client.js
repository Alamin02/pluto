const baseUrl =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

export const getProfile = async (token) => {
  return fetch(`${baseUrl}/users/profile`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserOrder = async (token) => {
  return fetch(`${baseUrl}/orders`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const createUserImage = async (data, token) => {
  return fetch(`${baseUrl}/user-image`, {
    method: "post",
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserInfo = async (data, userId, token) => {
  return fetch(`${baseUrl}/users/${userId}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const updateUserPassword = async (data, userId) => {
  return fetch(`${baseUrl}/users/${userId}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
