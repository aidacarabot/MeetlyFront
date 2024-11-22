import { createPage } from "../../utils/functions/createPage";
import "./Home.css";

export const Home = () => {
  const div = createPage("home");
  
  div.innerHTML = `
    <h1>Bienvenido a Meetly</h1>
    <p>Esta es tu página de inicio.</p>
  `;

  return div;
};