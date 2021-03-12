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

  updateProduct: (productId, productData, token) => {
    return fetch(`${baseUrl}/users/products/${productId}`, {
      method: "get",
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
  },

  // category
  createCategory: (categoryData, token) => {
    return fetch(`${baseUrl}/category`, {
      method: "post",
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
  },
  getOffers: (token) => {
    return fetch("http://localhost:4000/api/v1/offers", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        return data;
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
