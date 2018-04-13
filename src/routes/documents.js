const express = require('express');

const router = express.Router();
const http = require('http');
const config = require('../../config');
const apiActions = require('../api-actions');

router.get('/documentlist', (req, res) => {
  const userId = `j:"${req.cookies.cookinguser}"`;

  apiActions.getDocuments(req.db.get(config.dataBase), userId, (data) => {
    res.json(data);
  });
});

router.get('/documentlist/:query', (req, res) => {
  const userId = `j:"${req.cookies.cookinguser}"`;
  const query = decodeURI(req.params.query);

  apiActions.getDocument(req.db.get(config.dataBase), userId, query, (data) => {
    res.json(data);
  });
});

router.post('/adddocument', (req, res) => {
  const collection = req.db.get(config.dataBase);
  apiActions.addDocument(collection, req.body, () => {
    res.send();
  });
});

router.delete('/deletedocument/:id', (req, res) => {
  const collection = req.db.get(config.dataBase);
  const id = req.params.id;

  apiActions.removeDocument(collection, id, () => {
    res.send();
  });
});

router.get('/recipesearch/:query', (req, res) => {
  const httpDetails = {
    query: req.params.query,
    host: 'food2fork.com',
    path: '/api/search?key=c0172c962f73f5feeaddc283613ce9ef&q=',
  };

  apiActions.makeHttpRequest(httpDetails, res, (returnValue) => {
    res.json(returnValue);
  });
});

module.exports = router;
