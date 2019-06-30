# not_an_imdb

Stack:
* Express
* Sequilize => MySSQL
* Babel
* React
* Bootstrap
* Docker

Some assumptions and simplications were made:
* No time for perfect separation
* No time for perfect comment - instead simple and clean naming to keep code readable
* Docker compose config is simplified as well.
* Everything served thru express it's no time to make proper react project
* Web services available on localhost:8080
* API url is 'localhost:8080/api'

Start-Up:
* git clone
* docker-compose up

API:
* localhost:8080/api/actor [GET,POST] list of actors
* localhost:8080/api/actor/:id [PUT,DELETE] there is restriction for id in body
* localhost:8080/api/actor/:id/info [GET] fully propagated info about actor and his movies
* localhost:8080/api/movie [GET,POST] list of actors
* localhost:8080/api/movie/:id [PUT,DELETE] there is restriction for id in body
* localhost:8080/api/movie/:id/info [GET] fully propagated info about movie and cast members
* localhost:8080/api/movie/:id/cast [GET, POST] list of pars {movieId, actorId}
* localhost:8080/api/movie/:id/cast/:actorId [DELETE] there is restriction for id in body

TODO:
- Actors
- Movies
- Cast
- JOINs
- Routes CRUD actors and cast
- Routes CRUD movies and cast
* React
* Bootstrap
* React Dom Router