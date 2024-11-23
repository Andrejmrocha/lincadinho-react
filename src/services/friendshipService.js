import { api_url, requestConfig } from "../utils/config";

const fetchFriendshipRequests = async (id) => {
  const token = localStorage.getItem("token");
  const config = requestConfig("GET", null, token);

  try {
    const response = await fetch(
      api_url + "/amizades/solicitacoes/recebidas/" + id,
      config
    );
    const responseData = await response.json();

    if (response.ok) {
      return { message: "Busca concluída", data: responseData };
    } else {
      throw new Error(responseData.message || "Erro ao buscar solicitações");
    }
  } catch (error) {
    if (error.message === "Failed to fetch") {
      return {
        error: "Falha ao conectar ao servidor. Verifique sua conexão",
      };
    }
    return {
      error: error.message || "Erro ao realizar busca de solicitações.",
    };
  }
};

const sendFriendshipRequest = async (userId, friendId) => {
  const token = localStorage.getItem("token");
  const config = requestConfig(
    "POST",
    { remetenteId: userId, destinatarioId: friendId },
    token
  );

  try {
    const response = await fetch(api_url + "/amizades/enviar", config);
    const responseData = await response.json();
    console.log(config);

    if (response.ok) {
      return { message: "Solicitação enviada", data: responseData };
    } else {
      throw new Error(responseData.message || "Erro ao enviar solicitação");
    }
  } catch (error) {
    if (error.message === "Failed to fetch") {
      return {
        error: "Falha ao conectar ao servidor. Verifique sua conexão",
      };
    }
    return {
      error: error.message || "Erro ao enviar solicitação.",
    };
  }
};

const handleFriendshipRequest = async (friendshipId, action) => {
  const token = localStorage.getItem("token");
  const config = requestConfig("POST", null, token);

  try {
    const response = await fetch(
      api_url + `/amizades/${action}/${friendshipId}`,
      config
    );

    const responseData = await response.json();

    if (response.ok) {
      return {
        message: `Solicitação de amizade ${
          action === "aceitar" ? "aceita" : "recusada"
        }.`,
        data: responseData,
      };
    } else {
      throw new Error(
        responseData.message || `Erro ao ${action} solicitação de amizade`
      );
    }
  } catch (error) {
    if (error.message === "Failed to fetch") {
      return {
        error: "Falha ao conectar ao servidor. Verifique sua conexão",
      };
    }
    return {
      error: error.message || `Erro ao ${action} a solicitação de amizade.`,
    };
  }
};

const suggestedFriendship = async () => {
  const token = localStorage.getItem("token");
  const config = requestConfig("GET", null, token);

  try {
    const response = await fetch(
      api_url + "/autenticacao/listarSugestoes",
      config
    );
    const responseData = await response.json();

    if (response.ok) {
      return {
        message: "Sugestões de amizades.",
        data: responseData,
      };
    } else {
      throw new Error(
        responseData.message || `Erro ao listar sugestões de amizade`
      );
    }
  } catch (error) {
    if (error.message === "Failed to fetch") {
      return {
        error: "Falha ao conectar ao servidor. Verifique sua conexão",
      };
    }
    return {
      error: error.message || `Erro ao listar sugestões de amizade.`,
    };
  }
};

const friendshipService = {
  fetchFriendshipRequests,
  handleFriendshipRequest,
  sendFriendshipRequest,
  suggestedFriendship,
};

export default friendshipService;
