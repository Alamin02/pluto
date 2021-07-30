const baseUrl =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

export async function getSettings() {
  return fetch(`${baseUrl}/settings`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updateSettings(updatedSettings) {
  return fetch(`${baseUrl}/settings`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedSettings),
  });
}
