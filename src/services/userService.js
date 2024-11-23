import { api_url, requestConfigImage } from "../utils/config";

const profile = async ({ id }, token) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(api_url + `/autenticacao/${id}`, config);

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message || "Erro ao buscar dados.");
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log("erro no user service: ", error);
  }
};

const updateProfile = async (data, token) => {
  const config = requestConfigImage("PUT", data, token);
  try {
    const response = await fetch(api_url + "/autenticacao", config);

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message || "Erro ao atualizar dados");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("erro no user service: ", error);
  }
};

const getUsers = async (searchTerm = "") => {
  const token = localStorage.getItem("token");
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      api_url + "/autenticacao/listarColegas",
      config
    );
    if (!response.ok) {
      const responseData = response.json();
      throw new Error(responseData.message || "Erro ao buscar dados");
    }
    const responseData = response.json();
    return responseData;
  } catch (error) {
    console.log("erro no user service: ", error);
  }
};

const userService = {
  profile,
  getUsers,
  updateProfile,
};

export default userService;
