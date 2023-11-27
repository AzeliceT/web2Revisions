const myForm = document.querySelector('form');
const wish = document.querySelector('#wish');
const messageDiv = document.querySelector('#message');

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //permet de ne pas raffraichir la page
    myForm.style.display = 'none';
    //permet de ne plus voir le formulaire
    messageDiv.innerText = `Your current wish is : ${wish.value}`;
    //va prendre la valeur de l'id="wish"
    //la valeur étant mon souhait. 
});