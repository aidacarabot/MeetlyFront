export const reload = (e, route) => {
  e.preventDefault(); //para que no se recargue automáticamente
  window.history.pushState("", "", route.path);
  route.page();
}