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
* localhost:8080/api/actor *[GET,POST]* list of actors
* localhost:8080/api/actor/:id *[PUT,DELETE]* there is restriction for id in body
* localhost:8080/api/actor/:id/info *[GET]* fully propagated info about actor and his movies
* localhost:8080/api/movie *[GET,POST]* list of actors
* localhost:8080/api/movie/:id *[PUT,DELETE]* there is restriction for id in body
* localhost:8080/api/movie/:id/info *[GET]* fully propagated info about movie and cast members
* localhost:8080/api/movie/:id/cast *[GET,POST]* list of pars {movieId, actorId}
* localhost:8080/api/movie/:id/cast/:actorId *[DELETE]* there is restriction for id in body

TODO:
- Actors
- Movies
- Cast
- JOINs
- Routes CRUD actors and cast
- Routes CRUD movies and cast
- React
- Bootstrap
- React Dom Router
* Migrate from IMDB dataset

Result:
* API is OK
* Frontend is not ready
* All React component's embedded to page and loaded from CDN.
* Build support :) 

Mistakes:
* Wrong first steps editros and preview components that suppose to be merged and resolved base on route

Examples:
* Add actor
[POST] http://localhost:8080/api/actor/
```json
{
	"first_name": "John",
	"last_name": "Weeeeeeeck"
}
```

* Get list of actors
[GET] http://localhost:8080/api/actor/
```json
[
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Weeeeeeeck"
    }
]
```

* Get actor profile
[GET] http://localhost:8080/api/actor/1
```json
{
    "id": 1,
    "first_name": "John",
    "last_name": "Weeeeeeeck"
}
```

* Add movie
[POST] http://localhost:8080/api/movie/
```json
{
	"title": "test",
	"release_date": "2011-10-13",
	"duration": "180"
}
```

* Get list of Movies
[GET] http://localhost:8080/api/movie/
```json
[
    {
        "id": 1,
        "title": "test",
        "release_date": "2011-10-13",
        "duration": "180"
    }
]
```

* Get movie profile
[GET] http://localhost:8080/api/movie/1
```json
{
    "id": 1,
    "title": "test",
    "release_date": "2011-10-13",
    "duration": "180"
}
```

* Add actor as cast
[POST] http://localhost:8080/api/movie/1/cast
```json
{
	"actorId": 1
}
```

* Get list of cast members (id's only)
[GET] http://localhost:8080/api/movie/1/cast
```json
[
    {
        "actorId": 1,
        "movieId": 1,
    }
]
```

* Get full info about movie
[GET] http://localhost:8080/api/movie/1/info
```json
{
    "id": 1,
    "title": "test",
    "release_date": "2011-10-13T00:00:00.000Z",
    "duration": 180,
    "createdAt": "2019-06-30T20:28:33.000Z",
    "updatedAt": "2019-06-30T20:28:33.000Z",
    "casts": [
        {
            "movieId": 1,
            "actorId": 1,
            "createdAt": "2019-06-30T23:19:57.000Z",
            "updatedAt": "2019-06-30T23:19:57.000Z",
            "actor": {
                "id": 1,
                "first_name": "John",
                "last_name": "Weeeeeeeck",
                "birthday": null,
                "createdAt": "2019-06-30T21:51:38.000Z",
                "updatedAt": "2019-06-30T21:51:38.000Z"
            }
        }
    ]
}
```

* Get full info about actor
[GET] http://localhost:8080/api/actor/1/info
```json
{
    "id": 1,
    "first_name": "John",
    "last_name": "Weeeeeeeck",
    "birthday": null,
    "createdAt": "2019-06-30T21:51:38.000Z",
    "updatedAt": "2019-06-30T21:51:38.000Z",
    "casts": [
        {
            "movieId": 1,
            "actorId": 1,
            "createdAt": "2019-06-30T23:19:57.000Z",
            "updatedAt": "2019-06-30T23:19:57.000Z",
            "movie": {
                "id": 1,
                "title": "test",
                "release_date": "2011-10-13T00:00:00.000Z",
                "duration": 180,
                "createdAt": "2019-06-30T20:28:33.000Z",
                "updatedAt": "2019-06-30T20:28:33.000Z"
            }
        }
    ]
}
```