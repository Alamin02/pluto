const baseUrl =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

// carousel
export const createCarousel = async (values, token) => {
  return fetch(`${baseUrl}/carousels`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const getCarousels = async () => {
  return fetch(`${baseUrl}/carousels`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteCarousel = async (token, carouselId) => {
  return fetch(`${baseUrl}/carousels/${carouselId}`, {
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
