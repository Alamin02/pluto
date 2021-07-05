const baseUrl = "http://localhost:4000/api/v1";

// address
export const getAddresses = async (token) => {
  return fetch(`${baseUrl}/addresses`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
