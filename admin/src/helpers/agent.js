const baseUrl = "http://localhost:4000/api/v1";

export const agent = {
  // user
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

  getUsers: () => {
    return fetch(`${baseUrl}/users`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  editUser: (userData, token, userId) => {
    return fetch(`${baseUrl}/users/${userId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  },

  deleteUser: (token, userId) => {
    return fetch(`${baseUrl}/users/${userId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },

  // product
  updateProduct: (productId, productData, token) => {
    return fetch(`${baseUrl}/users/products/${productId}`, {
      method: "get",
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
  getCategories: () => {
    return fetch(`${baseUrl}/category`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

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

  // get single category
  getSingleCategory: (categoryId) => {
    return fetch(`${baseUrl}/category/${categoryId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
    // .then((res) => res.json())
    // .then(({ data }) => {
    //   return data;
    // });
  },

  getOffers: () => {
    return fetch(`${baseUrl}/offers`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        return data;
      });
  },

  editCategory: (categoryData, token, categoryId) => {
    return fetch(`${baseUrl}/category/${categoryId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
  },

  deleteCategory: (token, categoryId) => {
    return fetch(`${baseUrl}/category/${categoryId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },

  //offer
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

  getMe: (token) => {
    return fetch(`${baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },

  createProduct: (productData, token) => {
    return fetch(`${baseUrl}/products`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: productData,
    });
  },
};
