//! Renderiza un carrusel de eventos.
export const EventsCarousel = (parentDiv, events) => {
  const slideTrack = document.createElement("div");
  slideTrack.className = "slide-track";

  events.forEach((event) => {
    const slide = document.createElement("div");
    slide.className = "slide";

    const eventCard = EventCard(event, null, "event-card-hero");
    slide.appendChild(eventCard);
    slideTrack.appendChild(slide);
  });

  parentDiv.appendChild(slideTrack); // Agrega el carrusel al contenedor principal.
};