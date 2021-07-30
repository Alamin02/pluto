const baseUrl =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

// carousel
export const createFeaturedProduct = async (values, token) => {
  return fetch(`${baseUrl}/featured-products`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
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

export const deleteImage = async (imageId, token) => {
  return fetch(`${baseUrl}/image/${imageId}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
