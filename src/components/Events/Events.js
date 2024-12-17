//!Es un componente de nivel superior que maneja una colección de eventos y renderiza múltiples EventCard. Crea y organiza múltiples EventCard dentro de un contenedor.

import { fetchData } from "../../utils/api/fetchData"; // Importamos la función reutilizable para realizar peticiones al backend.
import { showErrorMessage, showSuccessMessage } from "../../utils/functions/messages";
import { navigateEventPage } from "../../utils/functions/NavigateEventPage";
import { EventCard } from "../EventCard/EventCard"; // Importamos el componente reutilizable para renderizar tarjetas de eventos.
import "./Events.css";


//? Exportamos una función asíncrona que renderiza una lista de eventos.
// parentDiv es un argumento que se pasa cuando llamas a la función Events. Representa el contenedor HTML (un div u otro elemento) donde se van a insertar las tarjetas de los eventos (EventCard). Por ejemplo:
//const mainDiv = document.querySelector("#main"); // Seleccionamos un div del DOM.
//Events(mainDiv); // Llamamos a la función pasándole este div como `parentDiv`.

//options es un objeto opcional que permite configurar algunos aspectos de la función Events. Si no se pasa, se utiliza el objeto vacío por defecto: {}.Este objeto puede incluir parámetros como:
	//endpoint: La URL de la API desde donde se obtendrán los eventos.
	//title: Un título personalizado que se mostrará en la sección de eventos.

  //? Cuando llamas a Events, puedes pasar un objeto options como este:
  //Events(mainDiv, { endpoint: "/api/v1/special-events", title: "Eventos Especiales" });
  //Si no pasas el argumento options, la función usará los valores por defecto definidos aquí:
    // const { 
    //   endpoint = "/api/v1/events", // URL predeterminada.
    //   title = "Echa un vistazo a los eventos actuales..." // Título predeterminado.
    // } = options;

export const Events = async (parentDiv, options = {}) => {
  // Desestructuramos las opciones para obtener el endpoint y un título opcional.
  const { 
    endpoint = "/api/v1/events", // Endpoint por defecto para obtener los eventos.
    title = "Echa un vistazo a los eventos actuales..." // Título por defecto para mostrar en la sección.
  } = options;

  //Creas una p y ahi pones el title que has desestructurado - título de la lista de eventos.
  const p = document.createElement("p");
  p.textContent = title;

  //contenedor para los eventos.
  const eventsDiv = document.createElement("div");
  eventsDiv.id = "events"; // Asignamos un ID al contenedor para facilitar el estilo y referencia.

  parentDiv.append(p, eventsDiv);  // Añadimos el título y el contenedor de eventos al elemento padre proporcionado.


  //? El siguiente bloque de código se encuentra dentro de un try-catch. El propósito es hacer una petición al backend para obtener los eventos, procesarlos y mostrarlos en el frontend como tarjetas.
  try {
    const events = await fetchData(endpoint);  // Hacemos una petición al backend para obtener la lista de eventos. El "endpoint" ya lo definiste más arriba. //Resultado esperado: Un array de eventos, donde cada evento es un objeto con propiedades como title, img, description, etc.

    //? Si no hay eventos, mostramos un mensaje al usuario.
    //Es decir, si en la llamada al backend no aparece nada o tiene 0 eventos creados, entonces se crea un mensaje para mostrar.
    if (!events || events.length === 0) {
      showErrorMessage(eventsDiv, "No hay eventos disponibles.");
      return;// Finalizamos la función si no hay eventos.
    }
    
    //? Iteramos sobre los eventos obtenidos y los renderizamos como tarjetas.
    //Posiblemente hayan muchos eventos en el backend creados, por ello, tenemos que pasar por cada uno de ellos para renderizarlos correctamente.
          // Usamos el componente EventCard importado para crear la representación visual de cada evento. En "event" básicamente le estamos mandando los datos obtenidos (los eventos) del backend.
      // Al hacer clic en una tarjeta, navegamos a la página del evento correspondiente.
      events.forEach((event) => {
        const eventCard = EventCard(event, () => navigateEventPage(event));
        eventsDiv.appendChild(eventCard);
      });
      
  } catch (error) {
    // Si ocurre un error al cargar los eventos, lo mostramos en la consola y notificamos al usuario.
    console.error("Error al cargar los eventos:", error);
    showErrorMessage(eventsDiv, "Hubo un error al cargar los eventos. Por favor, intenta más tarde.");
  }
};