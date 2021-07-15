const baseUrl = "http://localhost:4000/api/v1";

export const getOffers = async () => {
  return fetch(`${baseUrl}/offers`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createOffer = async (offerData, token) => {
  return fetch(`${baseUrl}/offers`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(offerData),
  });
};

export const editOffer = async (offerData, token, offerId) => {
  return fetch(`${baseUrl}/offers/${offerId}`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(offerData),
  });
};

export const deleteOffer = async (token, offerId) => {
  return fetch(`${baseUrl}/offers/${offerId}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const createOfferImage = async (data) => {
  return fetch(`${baseUrl}/offer-images`, {
    method: "post",
    body: data,
  });
};

export const deleteOfferImage = async (offerImageId, token) => {
  return fetch(`${baseUrl}/offer-images/${offerImageId}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
