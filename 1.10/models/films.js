const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const catalogue = [
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

function readAllFilms(orderByTitle) {
  const orderByTheTitle = orderByTitle?.includes('title') ? orderByTitle : undefined;
  let orderedCatalogue;

  const films = parse(jsonDbPath, catalogue);

  if (orderByTheTitle) orderedCatalogue = [...films].sort((a, b) => a.title.localeCompare(b.title));

  if (orderByTheTitle === '-title') orderedCatalogue = orderedCatalogue.reverse();

  return orderedCatalogue ?? films;
};

function readById(id){
    const films = parse(jsonDbPath, catalogue);
    const indexDuFilm = films.findIndex((film) => film.id === Number(id.id));

    return catalogue[indexDuFilm];
};

function createFilm(title, duration, budget, link){
    const films = parse(jsonDbPath, catalogue);


    const newFilm = {
        id: getNextId(),
        title,
        duration,
        budget,
        link,
      };

      films.push(newFilm);
    
      serialize(jsonDbPath, films);

      return newFilm;
};

function getNextId(){
    const films = parse(jsonDbPath, catalogue);

    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;

    if (lastItemIndex === undefined) return 1;

    const lastId = films[lastItemIndex]?.id;

    const nextId = lastId + 1;

    return nextId;
};

function deleteFilm(id){

  const idAsNumber = Number(id);
  const films = parse(jsonDbPath);
  const foundIndex = films.findIndex((pizza) => pizza.id === idAsNumber);
  if (foundIndex < 0) return undefined;
  const deletedFilms = films.splice(foundIndex, 1);
  const deletedFilm = deletedFilms[0];
  serialize(jsonDbPath, films);

  return deletedFilm;
};

function modifyFilm(id, attributsFilmAChanger){

    const idFilmAModifie = Number(id);

    const films = parse(jsonDbPath, catalogue);

    const indexDuFilm = films.findIndex((film) => film.id === idFilmAModifie);

    if(indexDuFilm<0) return undefined;

  
    const filmAModifie = {
      ...films[indexDuFilm],
      ...attributsFilmAChanger,
    };
  
    films[indexDuFilm] = filmAModifie;

    serialize(jsonDbPath, films);

    return filmAModifie;

};

function updateFilm(id, propertiesToUpdate){
    const idFilmAModifie = parseInt(id, 10);

    const films = parse(jsonDbPath, catalogue);

    const indexDuFilm = films.findIndex((film) => film.id === idFilmAModifie);
    
    if (indexDuFilm < 0) {
        const newFilm = { id: idFilmAModifie, ...propertiesToUpdate };
        films.push(newFilm);
        serialize(jsonDbPath, films);
        return newFilm;
      }

    const filmExistant = films[indexDuFilm];

    const filmEntierModifie = {
    ...filmExistant,
    ...propertiesToUpdate,
  };

  films[indexDuFilm] = filmEntierModifie;

  serialize(jsonDbPath, films)

  return filmEntierModifie;
}
module.exports = {
    readAllFilms,
    readById,
    createFilm,
    deleteFilm,
    modifyFilm,
    updateFilm,
};