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
    return fetch(`${baseUrl}/users/admin/${userId}`, {
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

  // get all products
  getProducts: (queryString = "") => {
    return fetch(`${baseUrl}/products?${queryString}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
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

  getOffers: () => {
    return fetch(`${baseUrl}/offers`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
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
      },
      body: offerData,
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
  createBlog: (blogData, token) => {
    return fetch(`${baseUrl}/blogs`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: blogData,
    });
  },
  editBlog: (blogData, token, blogId) => {
    return fetch(`${baseUrl}/blogs/${blogId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: blogData,
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

  // order
  getOrders: (token) => {
    return fetch(`${baseUrl}/orders`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },

  createProductImage: (data) => {
    return fetch(`${baseUrl}/images/`, {
      method: "post",
      body: data,
    });
  },

  getProductImage: (imageId) => {
    return fetch(`${baseUrl}/images/${imageId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  deleteBlogImage: (blogId) => {
    return fetch(`${baseUrl}/blogs/blogImage/${blogId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  deleteImage: (imageId) => {
    return fetch(`${baseUrl}/images/${imageId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // address
  getAddresses: (token) => {
    return fetch(`${baseUrl}/addresses`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // carousel
  createCarousel: (formData, token) => {
    return fetch(`${baseUrl}/carousels`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  },

  getCarousels: () => {
    return fetch(`${baseUrl}/carousels`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  deleteCarousel: (token, carouselId) => {
    return fetch(`${baseUrl}/carousels/${carouselId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },

  // offer image
  createOfferImage: (data) => {
    return fetch(`${baseUrl}/offer-image/`, {
      method: "post",
      body: data,
    });
  },

  deleteOfferImage: (offerImageId) => {
    return fetch(`${baseUrl}/offer-image/${offerImageId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
