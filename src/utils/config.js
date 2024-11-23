export const api_url = "http://localhost:8080";

export const requestConfig = (method, data, token = null) => {
  let config;
  if (method === "DELETE") {
    config = {
      method,
      headers: {},
    };
  } else if (method === "GET") {
    if (data === null) {
      config = {
        method,
        headers: { "Content-Type": "application/json" },
      };
    }
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export const requestConfigImage = (method, data, token) => {
  let config;

  if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    };
  }

  return config;
};
