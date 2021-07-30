const baseUrl =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

export const createAddress = async (addressData, token) => {
  return fetch(`${baseUrl}/addresses`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addressData),
  });
};

export const getUserAddress = async (token) => {
  return fetch(`${baseUrl}/addresses`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const updateAddress = async (addressData, token, addressId) => {
  return fetch(`${baseUrl}/addresses/${addressId}`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addressData),
  });
};
