const express = require('express')
const Blog = require('../models/blog')
const commentRouter = express.Router()
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment')

commentRouter.get('/:id/comments', async (request, response) => {
  const comment = await Blog.findById(request.params.id)
  .populate('comments', { content: 1 })
  response.json(comment)
})

commentRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  console.log(body)
  const blog = await Blog.findById(request.params.id)
  console.log(blog)
  console.log(blog.comments)
  const comment = new Comment({
    content: body.content,
  })
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  response.json(savedComment.toJSON())
})

module.exports = commentRouter