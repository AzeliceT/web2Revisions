import routes from './routes';

const Router = () => {
  onFrontendLoad();
  // gère quand il y a un chargement du frontend (qd on fait un refresh ou bien la toute 1ère fois où on ouvre l'application)
  onNavBarClick();
  // gère les clicks sur la navbar 
  onHistoryChange();
  // quand on clique sur la flèche du browser à gauche ou à droite
};

function onNavBarClick() {
  const navItems = document.querySelectorAll('.nav-link');

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const uri = e.target?.dataset?.uri;
      const componentToRender = routes[uri];
      if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

      componentToRender();
      window.history.pushState({}, '', uri);
    });
  });
}

function onHistoryChange() {
  window.addEventListener('popstate', () => {
    const uri = window.location.pathname;
    const componentToRender = routes[uri];
    componentToRender();
  });
}

function onFrontendLoad() {
  window.addEventListener('load', () => {
    const uri = window.location.pathname;
    const componentToRender = routes[uri];
    if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

    componentToRender();
  });
}

export default Router;
