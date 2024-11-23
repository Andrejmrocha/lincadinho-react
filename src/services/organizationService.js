import { api_url, requestConfigImage } from "../utils/config";

const createOrganization = async (data) => {
  const token = localStorage.getItem("token");

  const config = requestConfigImage("POST", data, token);

  try {
    const response = await fetch(api_url + "/empresa", config);

    const responseData = await response.json();

    if (response.ok) {
      return { message: "Cadastro realizado", data: responseData };
    } else {
      throw new Error(
        responseData.message || "Erro ao cadastrar a organização."
      );
    }
  } catch (error) {
    if (error.message === "Failed to fetch") {
      return {
        error: "Falha ao conectar ao servidor. Verifique sua conexão",
      };
    }
    return { error: error.message || "Erro ao realizar cadastro." };
  }
};

const getOrganizations = async () => {
  const config = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(api_url + "/empresa", config);

    const responseData = await response.json();

    if (response.ok) {
      return { message: "Busca realizada.", data: responseData };
    } else {
      throw new Error(responseData.message || "Erro ao listar organizações.");
    }
  } catch (error) {
    if (error.message === "Failed to fetch") {
      return {
        error: "Falha ao conectar ao servidor. Verifique sua conexão",
      };
    }
    return { error: error.message || "Erro ao buscar organizações." };
  }
};

const organizationService = {
  createOrganization,
  getOrganizations,
};

export default organizationService;
