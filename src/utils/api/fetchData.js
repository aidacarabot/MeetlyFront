const URL = "https://meetly-db.vercel.app";

export const fetchData = async (endpoint, method = "GET", data = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(`${URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en fetchData:", error);
    return null;
  }
};