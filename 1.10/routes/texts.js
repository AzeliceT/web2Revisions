/* eslint-disable spaced-comment */
const express = require('express');
const { readAllTexts, readByLevel, readById, createText, deleteAll, deleteText, updateText } = require('../models/texts');

const router = express.Router();

router.get('/', (req, res) => {
  const all = readAllTexts();

  return res.json(all);
});

router.get('/level/:level', (req, res) => {
  const level = req?.params;

  //console.log('Leveel', level);
  //console.log('--------------');


  if(level.level !== 'easy' && level.level !== 'hard' && level.level !== 'medium'){
    return res.sendStatus(400);
  };


  const texts = readByLevel(level);

  //console.log('LALALALLALA', texts);
  return res.json(texts);
});

router.get('/id/:id', (req, res) => {
  const index = readById(req?.params);
  //console.log('INDEXXX', index);

  if(index<0) return res.sendStatus(404);

  //console.log('READ BY ID ', index);
  return res.json(index);
});

router.post('/', (req, res) => {
    const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;
    const level = req?.body?.level?.length !== 0 ? req.body.level : undefined;
    
    if(!content || !level) return res.sendStatus(404);

    const created = createText(content, level);

    //console.log('CREATED', created);
    return res.json(created);
  });

  router.delete('/', (req, res) => {
    const deleted = deleteAll();
    return res.json(deleted);
  });

  router.delete('/:id', (req, res) => {

    const deleted = deleteText(req.params.id);

   // console.log('DELETEEEED', deleted);

    if(!deleted) return res.sendStatus(404);

    return res.json(deleted);
  });

  router.put('/:id', (req, res) => {
    const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;
    const level = req?.body?.level?.length !== 0 ? req.body.level : undefined;

    if(!content || !level) return res.sendStatus(404);

    const updated = updateText(req?.params?.id, req?.body);

    return res.json(updated);
  });

module.exports = router;
