const baseUrl = "http://localhost:4000/api/v1";

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
