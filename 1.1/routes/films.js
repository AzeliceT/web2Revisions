var express = require('express');
var router = express.Router();


const catalogue  = [
    {
        id: 1,
        title: 'Harry Potter', 
        duration: 120, 
        budget: 10000,
        link: 'https://fr.wikipedia.org/wiki/Harry_Potter',
    }, 
    {
        id: 2,
        title: 'Harry Potter2', 
        duration: 160, 
        budget: 20000,
        link: 'https://fr.wikipedia.org/wiki/Harry_Potter',
    },  {
        id: 1,
        title: 'Harry Potter3', 
        duration: 140, 
        budget: 30000,
        link: 'https://fr.wikipedia.org/wiki/Harry_Potter',
    }, 

];



/* READ tous les films du catalogue */
router.get('/', function(req, res, next) {
    console.log('GET /films');
    res.json(catalogue);
  });
  
  module.exports = router;
  