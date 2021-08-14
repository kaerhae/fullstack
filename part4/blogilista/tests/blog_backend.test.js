const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('./../models/blog')
const helper = require('./blog_backend_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initBlogs[1])
  await blogObject.save()
})


describe('Blog GET', () => {
  test('Blogs are returned', async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    })

  test('Right amount of blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initBlogs.length)
  })

  test('ID property is returned as id', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    expect(response.body.map(r => r.id)).toBeDefined()
  })
})

describe('Blog POST', () => {
  
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  }
  
  test('Blog is possible to send', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Blog is sent and amount is of blogs increased by 1', async () => {
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfterPost = await helper.blogsInDb()
      expect(blogsAfterPost).toHaveLength(helper.initBlogs.length + 1)

      
      const post = blogsAfterPost.map(n => n.title)
      expect(post).toContain(
        'React patterns'
      )
  })

  test('Returns status 400, if title or url missing', async () => {
    const emptyBlog = {
      author: "Michael Chan",
    }
    
    await api
        .post('/api/blogs')
        .send(emptyBlog)
        .expect(400)
  })

  test('When property likes is null, value returned to zero', async () => {
    const newBlog = {
      title: "If you think you understand testing, you do not understand testing",
      author: "Hunter S. Thompson",
      url: "https://reactpatterns.com/",
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost).toHaveLength(helper.initBlogs.length + 1)

    const post = blogsAfterPost.find(n => n.author === newBlog.author)
    expect(post.likes).toBe(0)
})
})

afterAll(() => {
  mongoose.connection.close()
})