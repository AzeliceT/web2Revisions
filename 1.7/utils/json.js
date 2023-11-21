const fs = require('fs');

/**
 * Parse items given in a .json file
 * @param {String} filePath - path to the .json file
 * If the file does not exist or it's content cannot be parsed as JSON data,
 * use the default data.
 * @param {Array} defaultArray - Content to be used when the .json file does not exists
 * @returns {Array} : the array that was parsed from the file (or defaultData)
 */
function parse(filePath, defaultArray = []) {
    if (!fs.existsSync(filePath)) return defaultArray;
    const fileData = fs.readFileSync(filePath);
    try {
      // parse() Throws a SyntaxError exception if the string to parse is not valid JSON.
      return JSON.parse(fileData);
    } catch (err) {
      return defaultArray;
    }
  }
  //On va créer une fonction qui s'appelle parse qui,  va prendre en paramètre un chemin vers un fichier JSON qui contiendra les films qu'on va sauvegarder, qui va prendre également un tableau par défaut.
  //La fonction va utiliser une librairie intégrée à node js, qui est fs, pour accéder au système de fichiers. 
  //Elle va vérifier si le chemin existe. S'il n'existe pas, ça veux dire qu'il n'y a pas encore de données JSON et donc on va retourner le tableau par défaut. Si on a pas passé de paramètre pour cette variable (dans ce tableau), alors on retourner un tableau vide. 
  //Si on a un fichier qui existe, on va utiliser la fonction node js qui permet de lire de manière synchrone un fichier. (fonction bloquante(on va pas aller plus loin dans le code tant que la lecture n'est pas terminée)). 

  //Une fois que la lecture est terminée, on aura une string qui contiendra les données au format json. 
  //Ensuite on va utiliser la fonction parse pour créer un objet dans le monde JS en mémoire vive qui contiendra toutes les données qui avaient été sauvegardé dans le dossier. 
  

/**
 * Serialize the content of an Object within a file
 * @param {String} filePath - path to the .json file
 * @param {Array} object - Object to be written within the .json file.
 * Even if the file exists, its whole content is reset by the given object.
 */
function serialize(filePath, object) {
    const objectSerialized = JSON.stringify(object);
    createPotentialLastDirectory(filePath);
    fs.writeFileSync(filePath, objectSerialized);
  }


/**
 *
 * @param {String} filePath - path to the .json file
 */
function createPotentialLastDirectory(filePath) {
    const pathToLastDirectory = filePath.substring(0, filePath.lastIndexOf('/'));
  
    if (fs.existsSync(pathToLastDirectory)) return;
  
    fs.mkdirSync(pathToLastDirectory);
  }

  module.exports = { parse, serialize };