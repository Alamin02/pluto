const baseUrl = "http://localhost:4000/api/v1";

export const getCarousels = async () => {
  return fetch(`${baseUrl}/carousels`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
