const express = require('express');

const router = express.Router();
const config = require('../../config');
const apiActions = require('../api-actions');

router.get('/', (req, res) => {
  const collection = req.db.get(config.dataBase);
  console.log('Hello 123');
  const userId = req.cookies.cookinguser;

  apiActions.getUserInfo(collection, userId, (user) => {
    const loggedIn = !!req.cookies.cookinguser;
    const userInfo = user ? user[0] : {};

    res.render('index', {
      title: 'Cookbook',
      loggedIn,
      username: userInfo.username,
      userId: userInfo._id,
    });
  });
});

router.get('/recipestore', (req, res) => {
  const collection = req.db.get(config.dataBase);
  const userId = req.cookies.cookinguser;

  apiActions.getUserInfo(collection, userId, (user) => {
    const loggedIn = !!req.cookies.cookinguser;
    const userInfo = user ? user[0] : {};

    res.render('recipestore', {
      title: 'Recipe Store',
      loggedIn,
      username: userInfo.username,
      userId: userInfo._id,
    });
  });
});

router.get('/recipe/:query', (req, res) => {
  const query = decodeURI(req.params.query).replace(/ /g, '_');
  const collection = req.db.get(config.dataBase);
  const userId = req.cookies.cookinguser;

  apiActions.getUserInfo(collection, userId, (user) => {
    const loggedIn = !!req.cookies.cookinguser;
    const userInfo = user ? user[0] : {};

    apiActions.getDocumentByTitle(collection, `j:"${req.cookies.cookinguser}"`, query, (docs) => {
      res.render('recipe', {
        title: 'Recipe',
        recipeName: docs[0].recipeName,
        cookingTime: docs[0].cookingTime,
        ingredients: docs[0].ingredients,
        method: docs[0].method,
        loggedIn,
        username: userInfo.username,
        userId: userInfo._id,
      });
    });
  });
});

router.get('/contact', (req, res) => {
  const collection = req.db.get(config.dataBase);
  const userId = req.cookies.cookinguser;

  apiActions.getUserInfo(collection, userId, (user) => {
    const loggedIn = !!req.cookies.cookinguser;
    const userInfo = user ? user[0] : {};

    res.render('contact', {
      title: 'Contact us',
      loggedIn,
      username: userInfo.username,
      userId: userInfo._id,
    });
  });
});

router.get('/login', (req, res) => {
  const collection = req.db.get(config.dataBase);
  const userId = req.cookies.cookinguser;

  apiActions.getUserInfo(collection, userId, (user) => {
    const loggedIn = !!req.cookies.cookinguser;
    const userInfo = user ? user[0] : {};

    res.render('login', {
      title: 'Login',
      loggedIn,
      username: userInfo.username,
      userId: userInfo._id,
    });
  });
});

router.get('/register', (req, res) => {
  const collection = req.db.get(config.dataBase);
  const userId = req.cookies.cookinguser;

  apiActions.getUserInfo(collection, userId, (user) => {
    const loggedIn = !!req.cookies.cookinguser;
    const userInfo = user ? user[0] : {};

    res.render('register', {
      title: 'Register',
      loggedIn,
      username: userInfo.username,
      userId: userInfo._id,
    });
  });
});

router.post('/login', (req, res) => {
  const collection = req.db.get(config.dataBase);

  apiActions.getUserID(collection, req.body.username, (id) => {
    res.cookie('cookinguser', id);
    res.status(200).send();
  });
});

router.post('/register', (req, res) => {
  const collection = req.db.get(config.dataBase);
  const userDetails = {
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  apiActions.registerUser(collection, userDetails, () => {
    apiActions.getUserID(collection, req.body.username, (id) => {
      res.cookie('cookinguser', id);
      res.status(200).send();
    });
  });
});

module.exports = router;
