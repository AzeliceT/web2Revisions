import space from '../../img/img.jpg';
import red from '../../img/red.png';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';

const HomePage = () => {

    const homePage = `
    <div id="privacyPolicyWrapper"></div>

    <div class="container text-center ">
              <div class="row">

    
                <div class="col text-white">
                  <h3>Welcome to myMovies !</h3>
    
                  <p>Here you can find a selection of our favorite movies ; )</p>

                </div>
              </div>
    
              <div class="row mb-3">
    
    
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
          main.innerHTML = homePage;    

          PrivacyPolicy();

    };


export default HomePage;
