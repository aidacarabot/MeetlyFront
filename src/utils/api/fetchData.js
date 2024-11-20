const URL = "https://meetly-db.vercel.app";

export const fetchData = async (endpoint, method = "GET", data = null) => {
  try {
    // Configuración de la petición
    const options = {
      method, // Método HTTP (GET, POST, etc.)
      headers: {
        'Content-Type': 'application/json', // Indicamos que enviamos JSON
      },
    };

    // Si hay datos para enviar, los añadimos al cuerpo de la petición
    if (data) {
      options.body = JSON.stringify(data);
    }

    // Realizamos la petición fetch
    const response = await fetch(`${URL}${endpoint}`, options);
    const responseData = await response.json(); // Convertimos la respuesta a JSON

    // Si la respuesta no es exitosa, lanzamos un error
    if (!response.ok) {
      throw { response: responseData };
    }

    // Si todo va bien, devolvemos los datos de la respuesta
    return responseData;
  } catch (error) {
    // Si hay un error, lo registramos en la consola y lo lanzamos
    console.error("Error en fetchData:", error);
    throw error;
  }
};