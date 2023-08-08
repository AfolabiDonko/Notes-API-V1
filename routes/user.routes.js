const router = require('express').Router();
const users = require('../controllers/user.controller');

module.exports = (app) => {
  router.post('/signup', users.create);
  router.post('/signin', users.connexion);
  app.use('/api/users', router);
};
