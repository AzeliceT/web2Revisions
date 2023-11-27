const lightSequence = ['red', 'orange', 'green', 'orange'];
const delaysBetweenLightChanges = 1000;
let currentLightIndex = 0;
const redLightWrapper = document.querySelector('#red-light-wrapper');

cycleThroughLights();

function cycleThroughLights() {
  const currentLightColor = lightSequence[currentLightIndex];
  //Quand on commence au tout début : 
  //Mets dans la constant currentLightColor la valeur rouge

  redLightWrapper.className = `${currentLightColor}-light`;
  //va aller dans l'HTML et changé la couleur à rouge
  setTimeout(() => {
    currentLightIndex = (currentLightIndex + 1) % lightSequence.length;
    cycleThroughLights();
    //va faire un appel récursive, on est plus à l'index 0 mais à l'index 1
    //le modulo permet de toujours continuer avec le même tableau
  }, delaysBetweenLightChanges);
  //1secondes entre chaque couleur
};