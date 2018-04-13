
import Request from 'superagent';

const http = require('http');
const config = require('../config');
const _ = require('lodash');

const actions = {
  addDocument(collection, content, next) {
    collection.insert(content, () => {
      next();
    });
  },
  removeDocument(collection, id, next) {
    collection.remove({ _id: id }, () => {
      next();
    });
  },
  getDocuments(collection, userId, next) {
    collection.find({ userID: userId }, {}, (e, docs) => {
      next(docs);
    });
  },
  getDocument(collection, userId, query, next) {
    collection.find({ userID: userId }, {}, (e, docs) => {
      const recipes = [];
      docs.forEach((recipe) => {
        if (_.includes(recipe.ingredients.toUpperCase(), query.toUpperCase())) {
          recipes.push(recipe);
        }
      });
      next(recipes);
    });
  },
  getDocumentByTitle(collection, userId, query, next) {
    collection.find({ userID: userId }, {}, (e, docs) => {
      console.log(docs);
      const recipes = [];
      docs.forEach((recipe) => {
        const recipeName = recipe.recipeName.toUpperCase().replace(/ /g, '_');

        if (recipeName === query.toUpperCase()) {
          recipes.push(recipe);
        }
      });
      next(recipes);
    });
  },
  registerUser(collection, userDetails, next) {
    collection.insert(newUser, () => {
      next(userDetails);
    });
  },
  getUserID(collection, username, next) {
    collection.find({ username }, {}, (e, users) => {
      next(users[0]._id);
    });
  },
  getUserInfo(collection, userId, next) {
    collection.find({ _id: userId }, {}, (e, user) => {
      next(user);
    });
  },
  makeHttpRequest(httpDetails, res, next) {
    const options = {
      host: httpDetails.host,
      path: httpDetails.path + httpDetails.query,
    };

    return http.get(options, (res) => {
      let body = '';

      if (res.statusCode !== 200) {
        console.log('Uh oh! Something has gone wrong!');
        return;
      }

      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        const parsed = JSON.parse(body);
        next({
          parsed: parsed.recipes,
        });
      });
    });
  },
};

module.exports = actions;
