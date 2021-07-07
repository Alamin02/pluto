const baseUrl = "http://localhost:4000/api/v1";

export const getBlogs = async (queryString = "") => {
  return fetch(`${baseUrl}/blogs?${queryString}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
