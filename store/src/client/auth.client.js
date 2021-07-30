const baseUrl =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

export const register = async (values, token) => {
  return fetch(`${baseUrl}/auth/register`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const login = async (values) => {
  return fetch(`${baseUrl}/auth/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const getMe = async (token) => {
  return fetch(`${baseUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
