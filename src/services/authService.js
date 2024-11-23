import { api_url, requestConfig } from "../utils/config";

const handleError = (error) => {
  if (error.message === "Failed to fetch") {
    return { error: "Falha ao conectar ao servidor. Verifique sua conexão." };
  }
  return { error: error.message || "Erro ao realizar a operação." };
};

const request = async (url, config) => {
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

const register = async (data) => {
  const response = await request(
    api_url + "/autenticacao/registrar",
    requestConfig("POST", data)
  );
  if (!response.error) {
    return response;
  } else {
    throw new Error("Erro ao realizar cadastro");
  }
};

const login = async (data) => {
  const responseData = await request(
    api_url + "/autenticacao/login",
    requestConfig("POST", data)
  );
  if (!responseData.error && responseData.token) {
    localStorage.setItem("token", responseData.token);
  }
  return responseData;
};

const logout = () => {
  localStorage.removeItem("token");
};

const verifyToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { valid: false, error: "Token não encontrado" };
  }

  const response = await request(api_url + "/autenticacao/verificarToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.error) {
    return { valid: false, error: response.error };
  }

  return {
    valid: response.valid,
    subject: response.subject,
    role: response.role,
    organization: response.organization,
    id: response.id,
  };
};

const isTokenExpiringSoon = (token) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expiration = payload.exp * 1000;
  return Date.now() > expiration - 60 * 60 * 1000;
};

const renewToken = async () => {
  const token = localStorage.getItem("token");
  if (token && isTokenExpiringSoon(token)) {
    const response = await request(api_url + "/autenticacao/atualizarToken", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response && response.token) {
      localStorage.setItem("token", response.token);
      return response.token;
    } else {
      throw new Error("Erro ao renovar o token.");
    }
  }
  return token;
};

const authService = { register, login, logout, verifyToken, renewToken };
export default authService;
