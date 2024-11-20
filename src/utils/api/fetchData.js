const URL = "https://meetly-db.vercel.app";

export const fetchData = async (endpoint, method = "GET", data = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${URL}${endpoint}`, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw { response: responseData };
    }

    return responseData;
  } catch (error) {
    console.error("Error en fetchData:", error);
    throw error;
  }
};