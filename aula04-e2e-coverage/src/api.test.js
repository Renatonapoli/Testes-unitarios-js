const { describe, it, after, before } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')

describe('Api suite test', () => {
  let app
  before((done) => {
    app = require('./api')
    app.once('listening', done)
  })

  after(done => app.close(done))

  describe('/contact:get', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await supertest(app)
      .get('/contact')
      .expect(200)

      assert.strictEqual(response.text, 'contact us page')
    })
  })
  describe('/login:post', () => {
    it('should request the login page and return HTTP Status 200', async () => {
      const response = await supertest(app)
      .post('/login')
      .send({username: 'RenatoNapoli', password: '1234'})
      .expect(200)

      assert.strictEqual(response.text, 'Log in succeessed!')
    })
    it('should request the login page and return HTTP Status 401', async () => {
      const response = await supertest(app)
      .post('/login')
      .send({username: 'XuxaDaSilva', password: '1234'})
      .expect(401)

      assert.strictEqual(response.text, 'Log in failed!')
    })
  })
  describe('/hi:get - 404', () => {
    it('should request existing page and return HTTP Status 404', async () => {
      const response = await supertest(app)
      .get('/hi')
      .expect(404)

      assert.strictEqual(response.text, 'not found!')
    })
   
  })
})