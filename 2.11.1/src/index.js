import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import Navbar from './Components/Navbar/Navbar';
import Router from './Components/Router/Router';

import HomePage from './Components/Pages/HomePage';

import AddMoviePage from './Components/Pages/AddMoviePage';

import ViewMoviePage from './Components/Pages/ViewMoviePage';

Navbar();

Router();

HomePage();

AddMoviePage();

ViewMoviePage();