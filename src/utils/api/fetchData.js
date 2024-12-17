const BASE_URL = "https://meetly-db.vercel.app"; //donde guardamos el servidor de nuestro backend

//? 	•	data: Si necesitas enviar información al servidor (como los datos de un nuevo usuario o un archivo), la pasas aquí. Si no necesitas enviar nada, lo dejas vacío. 
//?   •	headers: A veces el servidor necesita información extra, como un “token de seguridad”. Los headers son como una lista de instrucciones adicionales que acompañan la solicitud.
// Función reutilizable para realizar peticiones al servidor.
export const fetchData = async (endpoint, method = "GET", data = null, headers = {}) => {
  try {
    // Configuramos las opciones de la petición.n
    const options = {
      method, // El método HTTP (GET, POST, etc.)
      headers: {
        ...headers, // Incluimos headers personalizados como tokens de autenticación.Los headers sirven para que el servidor sepa cómo procesar tu petición y si realmente estás autorizado para hacer una petición.
      },
    };

    // Si hay datos a enviar en la petición, verificamos su tipo.
  //?   •	data: Son los datos que quieres enviar al servidor. Por ejemplo, podrían ser un formulario con el nombre de usuario, contraseña, o incluso un archivo como una imagen.
  //?   •	instanceof FormData: Verifica si los datos son de tipo FormData. Esto se usa cuando quieres enviar datos que incluyen archivos o formularios complejos.
  //? Si los datos son un FormData, significa que quieres subir algo como una imagen, video o archivo al servidor.
    if (data && data instanceof FormData) {
      // Si los datos son FormData (generalmente usado para subir archivos).
      options.body = data; // Si los datos son un FormData, los asignamos al cuerpo (body) de la petición.
    } else if (data) {
      // Si los datos no son FormData, asumimos que son JSON.
      options.headers["Content-Type"] = "application/json"; // Indicamos que estamos enviando/recibiendo JSON
      options.body = JSON.stringify(data); // Convertimos los datos a texto JSON para enviarlos.
    }

    // Realizamos la petición al servidor usando fetch.
    const response = await fetch(`${BASE_URL}${endpoint}`, options); 
    //? Aquí usamos fetch para comunicarnos con el servidor. 
    //? Le indicamos: Dónde (${BASE_URL}${endpoint}). Cómo (opciones como método, headers, y datos).

    const responseData = await response.json(); //? Una vez que el servidor responde, convertimos esa respuesta a un formato que podamos entender (JSON).

    // Verificamos si la petición fue exitosa.
    if (!response.ok) throw responseData; 
    //? Si el servidor indica que algo salió mal (por ejemplo, un error 404 o 500), lanzamos un error con los datos que envió el servidor.

    return responseData; 
    //? Si todo salió bien, devolvemos los datos que el servidor nos envió. Esto puede ser una lista de usuarios, un mensaje de confirmación, etc.
  } catch (error) {
    console.error("Error en fetchData:", error);
    throw error; 
    //? Si algo falla (como problemas de red), mostramos un mensaje en la consola y lanzamos el error para que lo maneje quien haya llamado a esta función.
  }
};