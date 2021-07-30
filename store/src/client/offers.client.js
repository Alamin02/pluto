const baseUrl =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

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
