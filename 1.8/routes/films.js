const express = require('express');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = `${__dirname}/../data/films.json`;

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

/* READ tous les films du catalogue */
router.get('/', (req, res) => {

  const orderByTitle = req?.query?.order?.includes('title') ? req.query.order : undefined;
  let orderedCatalogue;

  const films = parse(jsonDbPath, catalogue);

  if (orderByTitle) orderedCatalogue = [...films].sort((a, b) => a.title.localeCompare(b.title));

  if (orderByTitle === '-title') orderedCatalogue = orderedCatalogue.reverse();

  res.json(orderedCatalogue ?? films);
});

// eslint-disable-next-line consistent-return
router.get('/:id', (req, res) => {
  const films = parse(jsonDbPath, catalogue);

  const indexDuFilm = films.findIndex((film) => film.id === req.params.id);

  if (indexDuFilm < 0) return res.sendStatus(404);

  res.json(catalogue[indexDuFilm]);
});

// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(404);

  const films = parse(jsonDbPath, catalogue);

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;

  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;

  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title,
    duration,
    budget,
    link,
  };

  films.push(newFilm);

  serialize(jsonDbPath, films);

  res.json(newFilm);
});

// eslint-disable-next-line consistent-return
router.delete('/:id', (req, res) => {
  const films = parse(jsonDbPath, catalogue);

  const idFilmASupprimer = req.params.id;
  const indexDuFilm = films.findIndex((film) => film.id === idFilmASupprimer);

  if (indexDuFilm < 0) {
    return res.sendStatus(404);
  }

  const tableauElementSupprimer = films.splice(indexDuFilm, 1);

  serialize(jsonDbPath, films);

  res.json(tableauElementSupprimer[0]);
});

router.patch('/:id', (req, res) => {
  const films = parse(jsonDbPath, catalogue);

  const idFilmAModifie = req.params.id;
  const indexDuFilm = films.findIndex((film) => film.id === idFilmAModifie);

  if (indexDuFilm < 0) {
    return res.sendStatus(404);
  }

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  if (
    (title !== undefined && !title.trim()) ||
    (duration !== undefined && (typeof duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof budget !== 'number' || budget < 0)) ||
    (link !== undefined && !link.trim())
  ) {
    res.sendStatus(404);
  }

  const filmExistant = films[indexDuFilm];

  const attributsFilmAChanger = req.body;

  const filmAModifie = {
    ...filmExistant,
    ...attributsFilmAChanger,
  };

  films[indexDuFilm] = filmAModifie;
  return res.json(filmAModifie);
});

router.put('/:id', (req, res) => {
  const films = parse(jsonDbPath, catalogue);

  const idFilmAModifie = req.params.id;
  const indexDuFilm = films.findIndex((film) => film.id === idFilmAModifie);

  if (indexDuFilm < 0) {
    return res.sendStatus(404);
  }
  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  console.log('DURATION', duration);

  if (
    (title !== undefined && !title.trim()) ||
    (duration !== undefined && (typeof duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof budget !== 'number' || budget < 0)) ||
    (link !== undefined && !link.trim())
  ) {
    res.sendStatus(404);
  }

  const filmExistant = films[indexDuFilm];

  const attributsFilmAChanger = req.body;

  const filmEntierModifie = {
    ...filmExistant,
    ...attributsFilmAChanger,
  };

  films[indexDuFilm] = filmEntierModifie;

  return res.json(filmEntierModifie);
});

module.exports = router;
