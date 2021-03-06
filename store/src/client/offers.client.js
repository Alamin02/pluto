const baseUrl = "http://localhost:4000/api/v1";

export const getOffers = async () => {
  return fetch(`${baseUrl}/offers`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getOffer = async (offerId) => {
  return fetch(`${baseUrl}/offers/${offerId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
