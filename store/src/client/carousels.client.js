const baseUrl =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

export const getCarousels = async () => {
  return fetch(`${baseUrl}/carousels`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
