import { fetchData } from "../../utils/api/fetchData";
import { EventCard } from "../EventCard/EventCard";
import "./EventsCreated.css";

export const EventsCreated = async (parentDiv) => {
  parentDiv.innerHTML = "<p>Cargando tus eventos creados...</p>";

  try {
    const createdEvents = await fetchData("/api/v1/events/created", "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    if (!createdEvents || createdEvents.length === 0) {
      parentDiv.innerHTML = "<p>No has creado ningún evento aún.</p>";
      return;
    }

    const eventsContainer = document.createElement("div");
    eventsContainer.className = "events-container";

    createdEvents.forEach((event) => {
      const eventCard = EventCard(event, () => {
        const eventSlug = event.title.toLowerCase().replace(/ /g, "-");
        window.navigateTo(`/event/${eventSlug}`);
      });
      eventsContainer.appendChild(eventCard);
    });

    parentDiv.innerHTML = "";
    parentDiv.appendChild(eventsContainer);
  } catch (error) {
    console.error("Error al cargar eventos creados:", error);
    parentDiv.innerHTML = "<p>Error al cargar tus eventos creados. Intenta más tarde.</p>";
  }
};