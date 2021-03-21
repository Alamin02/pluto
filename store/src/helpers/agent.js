const baseUrl = "http://localhost:4000/api/v1";

export const agent = {
  // product
  getProducts: (queryString = "") => {
    return fetch(`${baseUrl}/products${queryString}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
