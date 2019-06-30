import express from 'express';

import { Actor } from '../db';

const router = express.Router();

router.get('/', function (req, res, next) {
    const options = {};

    if (req.query.offset > 0) options.offset = +req.query.offset;
    if (req.query.limit > 0) options.limit = +req.query.limit;

    if (req.query.contains !== undefined) {
      Actor
      .findAllActorsByName(req.query.contains, options)
      .then(actors => res.send(actors) )
      .catch(next);

    } else {
      Actor
      .findAll(options)
      .then(actors => res.send(actors) )
      .catch(next);

    }
});

router.get('/:actorId', function (req, res, next) {
  Actor
  .findByPk(req.params.actorId)
  .then(actor => {
    if (actor === null)
      res.sendStatus(404);
    else
      res.send(actor);
  })
  .catch(next);
});

router.post('/', function (req, res, next) {
    if (req.body.id !== undefined) throw new Error('Wrong property: id');

    Actor
    .create(req.body)
    .then(actor => res.json(actor.toJSON()) )
    .catch(next);
});

router.put('/:actorId', function (req, res, next) {
    if (req.body.id !== undefined) return res.sendStatus(400);

    Actor.
    updateAndReturn(req.params.actorId, req.body)
    .then(actor => res.send(actor) )
    .catch(next);
});

router.delete('/:actorId', function (req, res, next) {
  Actor
  .destroy({ where: {id: req.params.actorId }})
  .then(rowAffected => {
    if (rowAffected === 1)
      res.sendStatus(200);
    else
      res.sendStatus(404);
  })
  .catch(next);
});

export default router;