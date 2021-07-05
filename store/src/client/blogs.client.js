const baseUrl = "http://localhost:4000/api/v1";

export const getBlogs = async () => {
  return fetch(`${baseUrl}/blogs`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
