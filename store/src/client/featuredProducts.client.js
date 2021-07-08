const baseUrl = "http://localhost:4000/api/v1";

export const getFeaturedProducts = async () => {
  return fetch(`${baseUrl}/featured-products`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
