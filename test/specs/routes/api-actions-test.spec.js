import { expect } from 'chai';
import * as request from 'superagent';

const apiActions = require('../../../src/api-actions');
const config = require('../../../config.json');
const db = require('monk')('localhost:27017/sg');

const baseUrl = 'http://localhost:3000/';

describe('Cookbook recipestore page', () => {
  it('should return 200 status', () => request
    .get(`${baseUrl}recipeStore`)
    .then((res) => {
      expect(res.status).to.equal(200);
    }));

  it('should return documentlist', () => request
    .get(`${baseUrl}documents/documentlist`)
    .then((res) => {
      expect(res.body).to.be.an('array').that.is.empty;
    }));
});
