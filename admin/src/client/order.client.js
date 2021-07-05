const baseUrl = "http://localhost:4000/api/v1";

// order
export const getOrders=async(token) => {
    return fetch(`${baseUrl}/orders`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }