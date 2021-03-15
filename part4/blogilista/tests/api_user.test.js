const { test, expect } = require('@jest/globals')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('When creating new user, username cannot be undefined', async () => {
  const newUser = {
    "name": "tapio",
    "password":"sala"
    
}
  await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
})

test('When creating new user, password cannot be undefined', async () => {
  const newUser = {
    "username": "karitapio",
    "name":"tapio"
    
}
  await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
})

test('When creating new user, password has to be atleast 3 characters long', async () => {
  const newUser = {
    "username":"karitapio",
    "name": "tapio",
    "password":"sa"
    
}
  await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
})



afterAll(() => {
  mongoose.connection.close()
})