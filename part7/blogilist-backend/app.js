const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const commentRouter = require('./controllers/comments')
const loginRouter = require('./controllers/login')
const resetRouter = require('./controllers/reset')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
app.use(express.json())

logger.info('Connecting to ', config.MONGODB)

mongoose.connect(config.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', commentRouter)
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', resetRouter)
}



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app