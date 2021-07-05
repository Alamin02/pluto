const baseUrl = "http://localhost:4000/api/v1";

export const getBlogs = async () => {
  return fetch(`${baseUrl}/blogs`, {
    method: "get",
  })
    .then((res) => res.json())
    .then(({ data }) => {
      return data.blogs;
    });
};

export const createBlog = async (blogData, token) => {
  return fetch(`${baseUrl}/blogs`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: blogData,
  });
};

export const editBlog = async (blogData, token, blogId) => {
  return fetch(`${baseUrl}/blogs/${blogId}`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: blogData,
  });
};

export const deleteBlog = async (token, blogId) => {
  return fetch(`${baseUrl}/blogs/${blogId}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteBlogImage = async (blogId) => {
  return fetch(`${baseUrl}/blogs/blogImage/${blogId}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
