const router = require('express').Router();
const notes = require('../controllers/note.controller');

module.exports = (app) => {
  router.get('/', notes.findAll);
  router.put('/', notes.create);
  router.patch('/:id', notes.update);
  router.delete('/:id', notes.delete);
  app.use('/api/notes', router);
};
