const baseUrl = "http://localhost:4000/api/v1";

// carousel
export const createFeaturedProduct = async (formData, token) => {
  return fetch(`${baseUrl}/featured-products`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

export const getFeaturedProducts = async () => {
  return fetch(`${baseUrl}/featured-products`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteFeaturedProduct = async (token, producId) => {
  return fetch(`${baseUrl}/featured-products/${producId}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
