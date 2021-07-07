const baseUrl = "http://localhost:4000/api/v1";

// carousel
export const createCarousel = async (formData, token) => {
  return fetch(`${baseUrl}/carousels`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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
