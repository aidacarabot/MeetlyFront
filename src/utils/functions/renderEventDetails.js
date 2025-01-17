import { formatDate } from "./formatDate";

export const renderEventDetails = (event) => {
  return `
    <div class="allDetails-eventPg">
      <div class="mainDetails-eventPg">
        <h2 class="eventPg-title">${event.title}</h2>
        <p class="eventPg-organizer"><strong>Organizado por:</strong> ${
          event.organizer
        }</p>
        <img class="eventPg-img" src="${event.img}" alt="${event.title}" />
        <p class="eventPg-description"><strong>Descripción:</strong> ${
          event.description
        }</p>
      </div>
      <div class="secondDetails-eventPg">
        <p class="eventPg-date"><strong>Fecha:</strong> ${formatDate(
          event.date
        )}</p>
        <p class="eventPg-location"><strong>Ubicación:</strong> ${
          event.location
        }</p>
      </div>
    </div>
    <p class="attendees-count"><strong>${event.attendeesCount} Asistentes</strong></p>
  `;
};