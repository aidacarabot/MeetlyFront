import { CreateEvent } from "../pages/CreateEvent/CreateEvent";
import { EventPage } from "../pages/EventPage/EventPage";
import { Hero } from "../pages/Hero/Hero";
import { Home } from "../pages/Home/Home";
import { LoginRegister } from "../pages/LoginRegister/LoginRegister";
import { Profile } from "../pages/Profile/Profile";

export const routes = [
  {
    path: "/",
    text: "Hero",
    page: Hero
  },
  {
    path: "/inicio",
    text: "Inicio",
    page: Home
  },
  {
    path: "/perfil",
    text: "Perfil",
    page: Profile
  },
  {
    path: "/crear-evento",
    text: "Crear Evento",
    page: CreateEvent
  },
  {
    path: "/login",
    text: "Iniciar Sesión",
    page: () => LoginRegister("/login")
  },
  {
    path: "/register",
    text: "Registrarse",
    page: () => LoginRegister("/register")
  },
  { 
    path: "/event/:eventName",
    text: "Evento",
    page: EventPage,
  },
];