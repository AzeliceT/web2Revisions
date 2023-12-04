import HomePage from '../Pages/HomePage';
import AddMoviePage from '../Pages/AddMoviePage';
import ViewMoviePage from '../Pages/ViewMoviePage';
import AboutPage from '../Pages/AboutPage';
import Joke from '../Pages/JokePage';

const routes = {
  '/': HomePage,
  '/addMovie': AddMoviePage,
  '/viewMovie': ViewMoviePage,
  '/about': AboutPage,
  '/joke': Joke,
};

export default routes;
