const express = require('express');

const {
  readAllFilms, readById, createFilm, deleteFilm, modifyFilm, updateFilm
} = require('../models/films');

const router = express.Router();



/* Read all the films from the catalogue
   GET /films?order=title : ascending order by title
   GET /films?order=-title : descending order by title
*/
router.get('/', (req, res) => {

  const allFilmsPotentiallyOrdered = readAllFilms(req?.query?.order);

  return res.json(allFilmsPotentiallyOrdered);
});

router.get('/:id', (req, res) => {
  
  const indexDuFilm = readById(req.params.id);
  if (indexDuFilm < 0) return res.sendStatus(404);

  return res.json(indexDuFilm);
});

router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(404);


  const createdFilm = createFilm(title, duration, budget, link);

  return res.json(createdFilm);
});

router.delete('/:id', (req, res) => {
 
  const deletedFilm= deleteFilm(req.params.id);

  if (!deletedFilm) return res.sendStatus(404);

  return res.json(deletedFilm);
});

router.patch('/:id', (req, res) => {

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
    res.sendStatus(400);
  }

  const modifiedFilm = modifyFilm(req.params.id, { title, duration, budget, link });

  if (!modifiedFilm) return res.sendStatus(404);

  return res.json(modifiedFilm);
});

router.put('/:id', (req, res) => {
 
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
    res.sendStatus(400);
  }

  const updatedFilm = updateFilm(req?.params?.id, req?.body);

  if(!updatedFilm) return undefined;

  return res.json(updatedFilm);
});

module.exports = router;
