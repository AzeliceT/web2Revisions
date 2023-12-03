import space from '../../img/img.jpg';

import red from '../../img/red.png';

const HomePage = () => {

    const homePage = `
    
    <div class="container text-center ">
              <div class="row">
    
              <!--
              <div class="row">: C'est une rangée dans la grille Bootstrap. 
              Une rangée est utilisée pour contenir des colonnes (col) 
              afin de créer une mise en page basée sur une grille.
              -->
    
                <div class="col text-white">
                  <h3>Welcome to myMovies !</h3>
    
                  <p>Here you can find a selection of our favorite movies ; )</p>
                </div>
              </div>
    
              <div class="row mb-3">
    
              <!--
              <div class="row mb-3">: Une autre rangée avec une marge en bas 
              (classe mb-3 de Bootstrap), utilisée pour espacer visuellement le contenu suivant.
              -->
    
                <div class="col">
                <button type="button" class="btn btn-dark text-white">About</button>
                </div>
              </div>
    
    
    
            <div class="row">
              <div class="col-12 col-lg-6">
                <img class="img-thumbnail" src="${space}" alt="Space" width="200" height="200"/>
              </div>
    
              <div class="col-12 col-lg-6">
                <img class="img-thumbnail"  src="${red}" alt="JS" width="200" height="200" />
              </div>
            </div>
    </div>`;
    
          const main = document.querySelector('main');
    
          // const button = document.querySelector('button');

          main.innerHTML = homePage;
          // button.addEventListener('click', renderAboutPage);
    
    
    };


export default HomePage;
