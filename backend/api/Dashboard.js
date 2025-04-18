import express from 'express';
import { Dashboard, Users, DeleteUser, UpdateRole, movies, DraftMovies, latestMovies , PublicMovies, movie , Series , Bollywood , Hollywood, South, Marvel_Studio, Gujarati, TV_Shows, Web_Series , Anime} from '../controllers/Dashboard.js';

const Dashboardouter = express.Router();

Dashboardouter.get('/', Dashboard);
Dashboardouter.get('/users', Users);
Dashboardouter.delete('/users/:id', DeleteUser);
Dashboardouter.put('/users/:id', UpdateRole);

Dashboardouter.get('/movies', movies);
Dashboardouter.get('/publicmovies', PublicMovies);
Dashboardouter.get('/draftmovies', DraftMovies);
Dashboardouter.get('/latestmovies', latestMovies);
Dashboardouter.get('/movie', movie);
Dashboardouter.get('/series', Series);
Dashboardouter.get('/bollywood', Bollywood);
Dashboardouter.get('/hollywood', Hollywood);
Dashboardouter.get('/south', South);
Dashboardouter.get('/marvelstudio', Marvel_Studio);
Dashboardouter.get('/gujarati', Gujarati);
Dashboardouter.get('/tvshows', TV_Shows);
Dashboardouter.get('/webseries', Web_Series);
Dashboardouter.get('/anime', Anime);

export default Dashboardouter;
