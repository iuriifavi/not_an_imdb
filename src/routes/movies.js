import { Router } from 'express';

import { Cast, Movie, Actor } from '../db';

const router = Router();

router.get('/', function (req, res, next) {
    const options = {};

    if (req.query.offset > 0) options.offset = +req.query.offset;
    if (req.query.limit > 0) options.limit = +req.query.limit;

    if (req.query.contains !== undefined) {
      Movie
      .findAllMoviesByName(req.query.contains, options)
      .then(movie => res.send(movie) )
      .catch(next);

    } else {
      Movie
      .findAll(options)
      .then(movie => res.send(movie) )
      .catch(next);

    }
});

router.post('/', function (req, res, next) {
    if (req.body.id !== undefined) throw new Error('Wrong property: id');

    Movie
    .create(req.body)
    .then(movie => res.json(movie.toJSON()) )
    .catch(next);
});

router.get('/:movieId', function (req, res, next) {
    Movie
    .findByPk(req.params.movieId)
    .then(movie => {
      if (movie === null)
        res.sendStatus(404);
      else
        res.send(movie);
    })
    .catch(next);
});

router.put('/:movieId', function (req, res, next) {
    if (req.body.id !== undefined) return res.sendStatus(400);

    Movie.
    updateAndReturn(req.params.movieId, req.body)
    .then(movie => res.send(movie) )
    .catch(next);
});

router.delete('/:movieId', function (req, res, next) {
    Movie.
    destroy(req.params.movieId)
    .then(rowAffected => {
        if (rowAffected === 1)
          res.sendStatus(200);
        else
          res.sendStatus(404);
    })
    .catch(next);
});

router.get('/:movieId/info', function (req, res, next) {
    Movie.
    findAll({ where: { id: req.params.movieId} , include: [ { model: Cast, include: [Actor] }] })
    .then(fullInfo => {
        if (fullInfo.length === 1)
            res.send(fullInfo[0]);
        else
            res.sendStatus(404);
    })
    .catch(next);
});


router.get('/:movieId/cast', function (req, res, next) {
    Cast.
    findAll({where: { movieId: req.params.movieId}})
    .then(cast => res.send(cast) )
    .catch(next);
});

router.post('/:movieId/cast', function (req, res, next) {
    Cast.
    create({movieId: req.params.movieId, actorId: req.body.actorId })
    .then(cast => res.send(cast) )
    .catch(next);
});

router.delete('/:movieId/cast/:actorId', function (req, res, next) {
    Cast
    .destroy({where: { movieId: req.params.movieId, actorId: req.params.actorId }})
    .then(rowAffected => {
        if (rowAffected === 1)
            res.send(cast);
        else
            res.sendStatus(404);
    })
    .catch(next);
});


export default router;