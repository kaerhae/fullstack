const { test, expect } = require('@jest/globals')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('Blogs are returned as json', async () => {
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test('There are three blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(3)
})

test('First blog author is Seppo Tepponen', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].author).toBe('Seppo Tepponen')
})

test('Blogs contain property id', async () => {
  const response = await api.get('/api/blogs')
  const res = response.body

  expect(res[0, 1, 2].id).toBeDefined()
})


test('A valid blog object can be added', async () => {
  const newBlog = {
    title: 'Päiväni Murmelia',
    author: 'Veijo Tepponen',
    url: 'www.veijonkoti.blogspot.ppinet.fi',
    likes: 13,
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

})

test('If body.likes is undefined, set likes to zero', async () => {
  const newBlog = {
    title: 'Arvio siitä elokuvasta, jossa Pelastettiin Sotamies Ryan',
    author: 'Reijo Tepponen',
    url: 'www.elokuvat.blogspot.ppinet.fi',
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body[4].likes).toEqual(0)
})

test('If title is missing, throw status 400', async () => {
  const newBlog = {
    author: 'Reijo Tepponen',
    url: 'www.elokuvat.blogspot.ppinet.fi',
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
  .expect('Content-Type', /application\/json/)
})

test('If author is missing, throw status 400', async () => {
  const newBlog = {
    title: "Päiväni lampaana susien vaatteissa",
    url: 'www.elokuvat.blogspot.ppinet.fi',
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
  .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})