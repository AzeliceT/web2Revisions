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
    //S'il y a un paramètre de route on le mets dans la constante minimumDuration
    console.log(minimumDuration + '         MINIMUMDURATIIIION');

    if(!minimumDuration)
   //Si la constante minimumDuration est vide, donc qu'il n'y a aucun paramètres de route
    return res.json(catalogue);
    //alors on renvoie simplement le catalogue de film

   const minimumDurationParsed = Number(minimumDuration);
    //Convertis la valeur en string de minimumDuration en NUMBER et la mets dans la
    //constante minimumDurationParsed
    console.log(minimumDurationParsed + '         MINIMUMDURATIONPARSEEEED');

   if(isNaN(minimumDurationParsed) || minimumDurationParsed <= 0 ){
    //Si la constante minimumDurationParsed n'est un nombre OU BIEN que cette même
    //constante un nombre plus petit ou égal à 0
    return res.sendStatus(400);
    //alors on renvoie le Statut 400 (Bad Request)
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

    if(!title || !duration || !budget || !link)
    //vérifie si title est  undefined. S'il l'est, alors on renvoie l'erreur Not Found. 
        return res.sendStatus(404);

    const filmExistant = catalogue.find((film) => film.title.toLocaleLowerCase() === title.toLocaleLowerCase());
    //on mets dans la constante filmExistant le titre en minuscule du film qui existe & qui est égal au nouveau film qu'on veut ajouter.

    if(filmExistant)
    //s'il y a bien un film qui existe déjà qui est égal au nouveau film qu'on veut ajouter 
        return res.sendStatus(409);
        //alors on renvoi le Statut 409

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
  