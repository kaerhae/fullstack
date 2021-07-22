const { request, response } = require('express')
const express = require('express')
const Blog = require('../models/blog')
const blogsRouter = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  
  const blogs = await Blog.find({})
  .populate('user', { username: 1, name: 1})
  .populate('comments', { content: 1 })
    
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if (body.title === undefined) {
    return response.status(400).json({ error: 'Title missing'})
  }

  if (body.author === undefined) {
    return response.status(400).json({ error: "Author name missing"})
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
  response.json(updatedBlog.toJSON())
})


module.exports = blogsRouter
