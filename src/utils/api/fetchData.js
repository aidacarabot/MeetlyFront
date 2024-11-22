const BASE_URL = "https://meetly-db.vercel.app"; //donde guardamos el servidor de nuestro backend

//? 	•	data: Si necesitas enviar información al servidor (como los datos de un nuevo usuario), la pasas aquí. Si no necesitas enviar nada, lo dejas vacío. •	headers: A veces el servidor necesita información extra, como un “token de seguridad”. Los headers son como una lista de instrucciones adicionales que acompañan la solicitud.

export const fetchData = async (endpoint, method = "GET", data = null, headers = {}) => {
  try {
    // Configuración de la petición
    const options = {
      method, // El método HTTP (GET, POST, etc.)
      headers: {
        'Content-Type': 'application/json',  // Indicamos que estamos enviando/recibiendo JSON
        ...headers, // Agregamos cualquier header extra que pase el usuario. Si tienes más instrucciones (headers), como un token, también las agregamos.
      },
      body: data ? JSON.stringify(data) : null, // Si hay datos, los convertimos a texto JSON y los añadimos al cuerpo. Si tienes data (como el nombre de un nuevo usuario), lo convertimos a texto JSON porque el servidor no entiende directamente objetos de JavaScript.
    };

    // Realizamos la petición y convertimos directamente a JSON
    const response = await fetch(`${BASE_URL}${endpoint}`, options); //? Aquí usamos fetch para hablar con el servidor. Le decimos:Dónde (${BASE_URL}${endpoint}). Cómo (options con tu método, headers, y datos).
    const responseData = await response.json(); //? Una vez que el servidor responde, convertimos esa respuesta a un formato que podamos entender (JSON).

    // Verificación de éxito de la respuesta
    if (!response.ok) throw responseData; //? Si el servidor dice que algo salió mal (por ejemplo, un error 404 o 500), lanzamos un error con los datos que envió el servidor.

    return responseData; //? Si todo salió bien, devolvemos los datos que el servidor nos envió. Esto puede ser una lista de usuarios, un mensaje de confirmación, etc.
  } catch (error) {
    console.error("Error en fetchData:", error);
    throw error; //? Si algo falla (como problemas de red), mostramos un mensaje en la consola y lanzamos el error para que lo maneje quien haya llamado a esta función.
  }
};