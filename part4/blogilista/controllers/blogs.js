const blogsRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
    .find({})
    .then(res => {
        response.json(res.map(blog => blog.toJSON()))
    })
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    blog
    .save()
    .then(res => {
        response.status(201).json(res)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
