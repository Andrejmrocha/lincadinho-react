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

const reviewText = async (originalText) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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", // Substitua pela sua chave
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Você é um assistente que revisa textos para torná-los claros, corrigindo gramática e melhorando a legibilidade, o texto será enviado para colegas de trabalho, então preciso textos não tão informais, além disso, seria interessante suavizar palavras grosseiras.",
          },
          {
            role: "user",
            content: `Revise o seguinte texto:\n\n${originalText}`,
          },
        ],
        max_tokens: 250, // Limite para textos curtos (controle de custo)
        temperature: 0.7, // Mantém a resposta criativa, mas controlada
      }),
    });

    if (!response.ok) {
      const errorMessage = `Erro: ${response.status} - ${response.statusText}`;
      throw new Error("Erro na solicitação à API");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "Sem resposta.";
  } catch (err) {
    throw new Error(err.message || "Erro ao processar o texto.");
  }
};

const feedbackService = {
  createFeedback,
  fetchFeedbacks,
  reviewText,
};

export default feedbackService;
