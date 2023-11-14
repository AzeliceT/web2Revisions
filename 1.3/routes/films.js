var express = require('express');
var router = express.Router();


const catalogue  = [
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
    },  {
        id: 3,
        title: 'c', 
        duration: 140, 
        budget: 30000,
        link: 'https://fr.wikipedia.org/wiki/Harry_Potter',
    }, 

];


/* READ tous les films du catalogue */
router.get('/', function(req, res, next) {
    console.log('GET /films');
   const minimumDuration =  req?.query?.['minimum-duration'];

   const minimumDurationParsed = Number(minimumDuration);

   //if(minimumDuration === undefined || minimumDurationParsed <= 0){
    //return res.json(catalogue);
   //};

   if((isNaN(minimumDuration))|| minimumDurationParsed <= 0){
    return res.json(catalogue);
   };

   const catalogueFiltred = catalogue.filter((film) => film.duration >= minimumDurationParsed);
   //On vérifie que le film ait une duration de plus grand ou égal à celle mis en paramètre.

   return res.json(catalogueFiltred);
  });
  


  router.get('/:id', (req, res)=>{
    const indexDuFilm = catalogue.findIndex((film)=> film.id == req.params.id);
    //on mets l'index du film en question dans une constante "indexDuFilm"
    //req.params.id fait référence à un paramètre id extrait de la requête HTTP actuelle (req). 
    //Il est couramment utilisé pour récupérer des valeurs passées dans l'URL 
    //lorsqu'une route express gère une demande.
    if(indexDuFilm < 0 ) return res.sendStatus(404);
    //On part du principe qu'aucun film n'a un id plus petit que 0, mais si dans l'URL on indique 
    //un id = 0 alors on renvoi une erreur statue 404 (Not Found).
    return res.json(catalogue[indexDuFilm]);
    //on renvoie le film en question en format json.
});

//Création d'un film pour l'ajouter dans le catalogue
router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    //req?.body? ... cest possible que la valeur est nulle(si on fait pas ça le code peut beug)
    const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    //on vérfie que la taille du titre ne soit pas égal à 0, si c'est égal à 0 (??), alors la valeur du req.body.title sera undefined & on va le mettre dans la constante title
    //on vérife que la taille du contenu ne soit pas égal à 0, si c'est égal à 0, alors la valeur du req.body.content sera undefined & on va le mettre dans la constante title.

    if(!title || !duration || !budget || !link)
    //vérifie si title est  undefined. S'il l'est, alors on renvoie l'erreur Not Found. 
        return res.sendStatus(404);

    const lastItemIndex = catalogue?.length !==0 ? catalogue.length -1 : undefined;
    //Vise à déterminer l'indice du dernier élément du tableau. 
                        // si la longueur du tableau n'est pas égale à 0 alors on renvoie l'indice du dernier élément du tableau.
                                                                        //Si la longueur du tableau/taille = 0, alors l'expression renvoie undefined
    const lastId = lastItemIndex !== undefined ? catalogue[lastItemIndex]?.id : 0;
    //Vise à déterminer l'ID du dernier élément du tableau.
                 // Si lastItemInde n'est pas undefined, s'il n'est pas undefined, alors ça veut dire qu'il y a un dernier élément dans le tableau.
                                                //Ducoup on va y accéder. 
                                                                        //L'opérateur ?.id est utilisé pour accéder à la propriété "id" du dernier élément du tableau. 
                                                                             //Si le dernier éléement du tableau est undefined alors la valeur par défaut est définie à 0.
    const nextId = lastId +1;
    //On va donner l'id du prochain, ATTENTION on cherche pas à CREER un nouveau film du coup
    //ça va permettre de directement stocker la valeur de l'id du prochain film qu'on vient d'ajouter

    const newFilm = {
        id: nextId, 
        title: title, 
        duration: duration, 
        budget: budget, 
        link: link, 
    };
    catalogue.push(newFilm);

    res.json(newFilm);
});
 
  module.exports = router;
  