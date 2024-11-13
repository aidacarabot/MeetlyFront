import { CreateEvent } from "../pages/CreateEvent/CreateEvent";
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
    text: "Login",
    page: LoginRegister
  },
  {
    path: "/register",
    text: "Register",
    page: LoginRegister
  }
];