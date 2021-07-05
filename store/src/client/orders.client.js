const baseUrl = "http://localhost:4000/api/v1";

export const createOrder = async (orderData, token) => {
  return fetch(`${baseUrl}/orders`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
};
