let counter = 0;

let messageWrapper = document.querySelector('.message');
let counterWrapper = document.querySelector('.counter');

window.addEventListener('click', () => {
    //window. car on veut pouvoir cliquer sur toute la page et que ça fonctionne.
    ++counter;
    counterWrapper.textContent = counter;
    //affiche le nombre de clic
    if (counter == 5) messageWrapper.textContent = 'Bravo, bel échauffement !';
    else if (counter === 10 ) messageWrapper.textContent = "Vous êtes passé maître en l'art du clic !";

});