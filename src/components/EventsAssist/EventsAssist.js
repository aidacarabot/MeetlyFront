import { fetchData } from "../../utils/api/fetchData";
import { EventCard } from "../EventCard/EventCard";
import "./EventsAssist.css";

export const EventsAssist = async (parentDiv) => {
  const assistDiv = document.createElement("div");
  assistDiv.className = "events-assist";

  try {
    const events = await fetchData("/api/v1/events/attend", "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    if (!events || events.length === 0) {
      assistDiv.textContent = "No estás inscrito en ningún evento.";
      parentDiv.appendChild(assistDiv);
      return;
    }

    events.forEach((event) => {
      const eventCard = EventCard(event, () => {
        const eventSlug = event.title.toLowerCase().replace(/ /g, "-");
        window.navigateTo(`/event/${eventSlug}`);
      });
      assistDiv.appendChild(eventCard);
    });

    parentDiv.appendChild(assistDiv);
  } catch (error) {
    console.error("Error al cargar eventos asistidos:", error);
    assistDiv.textContent = "Error al cargar los eventos.";
    parentDiv.appendChild(assistDiv);
  }
};