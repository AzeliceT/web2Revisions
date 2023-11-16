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

    const orderByTitle =   req?.query?.order?.includes('title')  ? req.query.order : undefined
                        //cette expression vérifie si le paramètre de requête order contient la chaîne 'title'. 
                        //Les paramètres de requête sont extraits de la requête HTTP et sont stockée dans l'objet req.query.
                        //Si le paramètre order contient 'title', alors orderByTitle sera défini sur la valeur de req.query.order, sinon il sera défini sur undefined. 
                        //?: C'est l'opérateur ternaire, qui est une façon de conditionner 
                        //la valeur d'une variable en fonction d'une condition. 
                        //Dans ce cas, si la condition req?.query?.order?.includes('title') 
                        //est vraie (c'est-à-dire que le paramètre order contient 'title'), 
                        //alors orderByTitle est défini sur req.query.order.
                        //Sinon, orderByTitle est défini sur undefined.
    let orderedCatalogue

    if(orderByTitle)
        orderedCatalogue=[...catalogue].sort((a, b)=>a.title.localeCompare(b.title));
                        //on crée une copie du tableau catalogue puis on utilise la méthode sort() pour trier cette copie par titre.
                        //la fonction de comparaison a.title.localeCompare(b.title) est utilisée pour effectuer le tri alphabétique.
                        //Le résultat trié est stockée dans la variable orderedCatalogue.
        if(orderByTitle==='-title') 
        orderedCatalogue=orderedCatalogue.reverse();
            //cette condition vérfie si la valeur de orderByTitle = -title, si c'est le cas alors la méthode reverse() va inverser 
            //les valeurs du orderedCatalogue, pour que ça soit en décroissant
    res.json(orderedCatalogue ?? catalogue);
    //la réponse sera renvoyée en format json. L'opérateur "??" est utilisé pour fournir une valeur par défaut
    //si orderedCatalogue est undefined, qui est la catalogue non trié
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
    res.json(catalogue[indexDuFilm]);
    //on renvoie le film en question en format json.
});

//Création d'un film pour l'ajouter dans le catalogue
router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
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
  