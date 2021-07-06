const baseUrl = "http://localhost:4000/api/v1";

export const logIn = async (values) => {
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
