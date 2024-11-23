import { api_url, requestConfig } from "../utils/config";

const createFeedback = async (data) => {
  const token = localStorage.getItem("token");
  const config = requestConfig("POST", data, token);

  try {
    const response = await fetch(api_url + "/feedback/usuario", config);
    const responseData = await response.json();

    if (response.ok) {
      return { message: "Feedback enviado", data: responseData };
    } else {
      throw new Error(responseData.message || "Erro ao enviar feedback");
    }
  } catch (error) {
    if (error.message === "Failed to fetch") {
      return {
        error: "Falha ao conectar ao servidor. Verifique sua conexão",
      };
    }
    return { error: error.message || "Erro ao realizar envio de feedback." };
  }
};

const fetchFeedbacks = async (idUsuario) => {
  const token = localStorage.getItem("token");
  const config = requestConfig("GET", null, token);
  try {
    const response = await fetch(
      api_url + "/feedback/usuario/lista/" + idUsuario,
      config
    );
    const responseData = await response.json();

    if (response.ok) {
      return {
        content: responseData.content,
        pageable: responseData.pageable,
        totalElements: responseData.totalElements,
        totalPages: responseData.totalPages,
        number: responseData.number,
        size: responseData.size,
      };
    } else {
      throw new Error(responseData.message || "Erro ao listar feedbacks!");
    }
  } catch (error) {
    if (error.message === "Failed to fetch") {
      return {
        error: "Falha ao conectar ao servidor. Verifique sua conexão",
      };
    }
    return { error: error.message || "Erro ao buscar feedbacks." };
  }
};

const feedbackService = {
  createFeedback,
  fetchFeedbacks,
};

export default feedbackService;
