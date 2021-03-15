const { request, response } = require('express')
const express = require('express')
const Blog = require('../models/blog')
const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
  
  
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

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (body.title === undefined) {
    return response.status(400).json({ error: 'Title missing'})
  }

  if (body.author === undefined) {
    return response.status(400).json({ error: "Author name missing"})
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
  })
  const savedBlog = await blog.save()
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
