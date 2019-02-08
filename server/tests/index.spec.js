const request = require('supertest');
const server = require('../../app');

describe('Load home route', () => {
  it('load the home route', (done) => {
    request(server).get('/').expect(200, done);
  });
});