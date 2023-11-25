/* eslint-disable spaced-comment */
const path = require('node:path');
const { v4: uuidv4 } = require('uuid');

const {serialize, parse} = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/texts.json');



const tableauDeTexteDactylographie = [
    {
        id: 1, 
        content: 'LE CONTENU TEXTUEL1', 
        level: 'easy',
    }, 
    {
        id: 2, 
        content: 'LE CONTENU TEXTUEL2', 
        level: 'easy',
    }, 
    {
        id: 3, 
        content: 'LE CONTENU TEXTUEL3', 
        level: 'medium',
    }, 
    {
        id: 4, 
        content: 'LE CONTENU TEXTUEL4', 
        level: 'medium',
    }, 
    {
        id: 5, 
        content: 'LE CONTENU TEXTUEL5', 
        level: 'hard',
    }, 
    {
        id: 6, 
        content: 'LE CONTENU TEXTUEL6', 
        level: 'hard',
    }, 
];

function readAllTexts(){
    const text = parse(jsonDbPath, tableauDeTexteDactylographie);
    // eslint-disable-next-line spaced-comment
    //console.log('TEXT', text);
    return text;
};

function readByLevel(level){
    const texts = parse(jsonDbPath, tableauDeTexteDactylographie);
    //console.log('HAHAHHAHAHA', texts);

    const textByLevel = texts.filter((text)=> text.level === level.level)
    //console.log('ICI', textByLevel);

    return textByLevel;
};

function readById(id){
    const texts = parse(jsonDbPath, tableauDeTexteDactylographie);

    //console.log('TEXTs', texts);
    const indexDuText = texts.findIndex((text) => text.id === Number(id.id))
    //console.log('----');
   // console.log('INDEX DU FUXCKING TEXT', indexDuText);
    return texts[indexDuText];
};

function createText(content, level){
    const texts = parse(jsonDbPath, tableauDeTexteDactylographie);

    const newText = {
        id: hexToDec(), 
        content, 
        level,
    };

    texts.push(newText);

    //console.log('TEXTS', texts);
    //console.log('---');
    //console.log('NEW TEXT', newText);
    
    serialize(jsonDbPath, texts);

    return newText;
};

// Fonction pour convertir un caractère hexadécimal en décimal
function hexToDec() {
    const hexString = uuidv4();

    let toDecimal = parseInt(hexString, 10);

    while(Number.isNaN(toDecimal)){
       // console.log('TO DECIMAL ONE', toDecimal);
        toDecimal = parseInt(uuidv4(), 10);
        //console.log('TO DECIMAL TWO', toDecimal);

    };

    //console.log('TO DECIMAAAL ', toDecimal);
    return toDecimal;
  };

  function deleteAll(){
    const texts = parse(jsonDbPath, tableauDeTexteDactylographie);
    //console.log('LENGTH TABLEAU', texts.length);
    const allDeleted = texts.splice(0, texts.length);
    serialize(jsonDbPath, texts);
    return allDeleted;
  };
  

function deleteText(id){
    const texts = parse(jsonDbPath, tableauDeTexteDactylographie);

   // console.log('TEXTS', texts);
    const indexDuText = texts.findIndex((text) => text.id === Number(id))
    //id est directement la valeur de l'ID, 
    //alors Number(id) serait plus approprié pour convertir la chaîne d'ID en un nombre.

   // console.log('indexDuText', indexDuText);
    if(indexDuText<0) return undefined;

    const deletedText = texts.splice(indexDuText, 1);

   // console.log('HIER DELETEDTEXT', deleteText);
    serialize(jsonDbPath, texts);

    return deletedText[0];
};

function updateText(id, propertiesToUpdate){

    const texts = parse(jsonDbPath, tableauDeTexteDactylographie);

    const idFilmAModifie = Number(id);
   // console.log('texts', texts);
    const indexDuText = texts.findIndex((text) => text.id === idFilmAModifie)
    //console.log('indexdu text', indexDuText);

    if (indexDuText < 0) {
        const newt = { id: idFilmAModifie, ...propertiesToUpdate };
        texts.push(newt);
        serialize(jsonDbPath, texts);
        return newt;
      }

      const textExistant = texts[indexDuText];
      //console.log('textExistant', textExistant);

      const textAModifier={
        ...textExistant, 
        ...propertiesToUpdate,
      };
     // console.log('textAModifier', textAModifier);

      texts[indexDuText]=textAModifier;

      //console.log('INFORMATIONS EDIEGHFUJDSZH');
      //console.log(texts[indexDuText]=textAModifier);

      serialize(jsonDbPath, texts);
      return textAModifier;

}

module.exports={
    readAllTexts,
    readByLevel,
    readById,
    createText,
    deleteText,
    updateText,
    deleteAll,
};

