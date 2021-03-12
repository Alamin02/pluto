const baseUrl = "http://localhost:4000/api/v1";

export const agent = {
  createUser: (userData, token) => {
    return fetch(`${baseUrl}/users/register`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  },

  // create product
  createProduct: (productData, token) => {
    return fetch(`${baseUrl}/products`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: productData,
    });
  },

  // edit product
  editProduct: (productId, productData, token) => {
    return fetch(`${baseUrl}/products/${productId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: productData,
    });
  },

  // delete product
  deleteProduct: (productId, token) => {
    return fetch(`${baseUrl}/products/${productId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // category
  createCategory: (categoryData, token) => {
    return fetch(`${baseUrl}/category`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
  },

  createOffer: (offerData, token) => {
    return fetch(`${baseUrl}/offers`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offerData),
    });
  },

  editOffer: (offerData, token, offerId) => {
    return fetch(`${baseUrl}/offers/${offerId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offerData),
    });
  },

  deleteOffer: (token, offerId) => {
    return fetch(`${baseUrl}/offers/${offerId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  getBlogs: () => {
    return fetch(`${baseUrl}/blogs`, {
      method: "get",
    })
      .then((res) => res.json())
      .then(({ data }) => {
        return data.blogs;
      });
  },
  createBlog: (BlogData, token) => {
    return fetch(`${baseUrl}/blogs`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(BlogData),
    });
  },
  editBlog: (blogData, token, blogId) => {
    return fetch(`${baseUrl}/blogs/${blogId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });
  },
  deleteBlog: (token, blogId) => {
    return fetch(`${baseUrl}/blogs/${blogId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
};
