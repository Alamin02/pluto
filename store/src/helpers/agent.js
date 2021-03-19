const baseUrl = "http://localhost:4000/api/v1";

export const agent = {
  // product
  getProducts: () => {
    return fetch(`${baseUrl}/products`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getBlogs: () => {
    return fetch(`${baseUrl}/blogs`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
