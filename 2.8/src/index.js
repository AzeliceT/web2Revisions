// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Custom styles
import './stylesheets/main.css';

import 'animate.css';

import filmImage from './img/disneyPlusFleuve.jpg';
import space from './img/img.jpg';
import red from './img/red.png';

const CATALOGUE = [
  {
    id: 1,
    title: 'a',
    duration: 120,
    budget: 10000,
    link: 'https://fr.wikipedia.org/wiki/Harry_Potter',
  },
  {
    id: 2,
    title: 'b',
    duration: 160,
    budget: 20000,
    link: 'https://fr.wikipedia.org/wiki/Harry_Potter',
  },
  {
    id: 3,
    title: 'c',
    duration: 140,
    budget: 30000,
    link: 'https://fr.wikipedia.org/wiki/Harry_Potter',
  },
];

const body = document.querySelector('main');

body.addEventListener('click', startOrStopSound);

renderMenuFromString(CATALOGUE);


renderFilmImage(filmImage);

function generateCombinedContent() {
const homePage = `
<div class="container text-center">
        <div class="row">
          <div class="col">
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-6">
            <!-- permet de gérer les colonnes, si on avait mis col-lg-2 l'image red se serait mis à gauche -->
            <img class="img-thumbnail" src="${space}" alt="Space" width="200" height="200"/>
          </div>

          <div class="col-12 col-lg-6">
            <img class="img-thumbnail"  src="${red}" alt="JS" width="200" height="200" />
          </div>
        </div>
      </div>`;

      const catalogueTable = getCatalogueTableAsString(CATALOGUE);
      // const pubsTable = getPubsTableAsNode(PUBS);
    
      return `
        ${homePage}
        ${catalogueTable}
      `;
};

// Fonction pour afficher le contenu généré sur la page
function displayCombinedContent() {
  const combinedContent = generateCombinedContent();
  const main = document.querySelector('main');
  main.innerHTML = combinedContent;
};

// Appel des fonctions pour afficher le contenu
displayCombinedContent();



// Ecouteur d'événement pour qu'au passage de la souris on change la couleur du tableau.
attachOnMouseEventsToGoGreen();


function startOrStopSound() {
  const myAudioPlayer = document.querySelector('#audioPlayer');

  if (myAudioPlayer.paused) myAudioPlayer.play();
  else myAudioPlayer.pause();
};

function renderMenuFromString(catalogue) {
  // prend le CATALOGUE en paramètre ( le tableau d'objet préalablement crée )
  const catalogueTableAsString = getCatalogueTableAsString(catalogue);
  // Sur base de ce paramètre, il va me générer une string, qui sera une table HTML dans laquelle il y aura des <td>(cellule), <tr>(ligne)
  const main = document.querySelector('main');
  // On va récupérer un container, un lien vers un container, à l'aide d'une fonction du DOM. Le container utilisé ici, c'est le <main>
  main.innerHTML += catalogueTableAsString;
  // on va concatainer à la suite de ce qui est déjà présent dans le main, le tableau qui va être généré par la fonction 'getCatalogueTableAsString'
  // innerHTML va faire en sorte que innerHTML va être mis à jour, du coup le DOM va être regénérer, modifier et ensuite le Browser va afficher la page avec notre table HTML
};

function getCatalogueTableAsString(catalogue) {
  const catalogueTableLines = getAllTableLinesAsString(catalogue);
  // fonction qui génère toutes les lignes du tableau sur base du tableau qu'on passe en paramètre qui contient tous les objets de type film
  const catalogueTable = addLinesToTableHeadersAndGet(catalogueTableLines);
  // Ajoute des Headers au tableau, donc avoir des titres
  return catalogueTable;
};

function getAllTableLinesAsString(menu) {
  let catalogueTableLines = '';

  menu?.forEach((film) => {
    // Elle va boucler sur chaque élément du tableau
    catalogueTableLines += `<tr>
      <td>${film.title}</td>
      <td>${film.duration}</td>
      <td>${film.budget}</td>
      <td>${film.link}</td>

    </tr>`;
    // Va créer une tr et une td pour chacunes de propriétés d'un film
    // <tr>  <td>Title1</td>  <td>Duration1</td>   <td>Budget1</td>   <td>Link1</td> </tr>
    // On a 3 films donc on aura 3 tr ( lignes )
  });

  return catalogueTableLines;
};

function addLinesToTableHeadersAndGet(tableLines) {
  // Va recevoir les 3 lignes ( 3 tr ) sous forme de string
  const catalogueTable = `
  <div class="table-responsive pt-5">
    <table class="table table-danger">
      <tr>
        <th>Films</th>
        <th>Durations</th>
        <th>Budgets</th>
        <th>Links</th>
      </tr>
      ${tableLines}    
    </table>
  </div>
  `;
  // Tout ceci est un Template literal
  return catalogueTable;
};

function attachOnMouseEventsToGoGreen() {
  // fonction qui permet d'attacher les écouteurs d'événements.
  const table = document.querySelector('table');

  table.addEventListener('mouseover', () => {
    table.className = 'table table-success';
    // class de bootstrap
  });

  table.addEventListener('mouseout', () => {
    table.className = 'table table-danger';
  });
};

function renderFilmImage(filmUrl) {
  // fonction qui créerait le rendu d'une image sur base du chemin vers cette image
  const image = new Image(); // or document.createElement('img');
  // on crée un élément node, un élément HTML en mémoire
  image.src = filmUrl;
  // change la propriété SRC pour qu'on récupère ici l'URL qui sera généré par webpack
  image.height = 50;
  const footer = document.querySelector('footer');
  footer.appendChild(image);
};