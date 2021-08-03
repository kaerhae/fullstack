require('dotenv').config()

const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError
} = require('apollo-server')

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()
const mongoose = require('mongoose')
const Author = require('./Models/Author')
const Book = require('./Models/Book')
const jwt = require('jsonwebtoken')
const User = require('./Models/User')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const MONGODB_URI = process.env.MONGODB

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    token: String!
    user: User!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [Book!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book

    addAuthor(
      name: String!,
      born: Int
    ): Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author})
        return await Book.find({
          author: { $in: author.id},
          genres: { $in: args.genre}
        }).populate('author')
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author})

        return await Book.find({
          author: { $in: author.id}
        }).populate('author')
      } 
      if (args.genre) {
        return await Book.find({
          genres: { $in: args.genre}
        }).populate('author')
      }
      else {
        return await Book.find({}).populate('author')
      }
    },

    allGenres: async () => {
      return await Book.find({}, { genres: 1} )
    },
    
    allAuthors: async () => {
      return await Author.find({ }).populate('books')
    },

    me: (root, args, context) => {
      return context.currentUser
    }
  },
  
  

  Book: {
    author: async (root) => {
      const author = await Author.findOne({ _id: root.author })
      return {
        id: author._id,
        name: author.name,
        born: author.born,
        bookCount: author.bookCount
      }
    }
  },

  Author: {
    bookCount: async (root) => {
      const book = await Book.find({ author: root.id })
      const bookCount = book.length
      return bookCount
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("Not authenticated, you must login first")
      }

      try {

        if (!author) {
          author = new Author({
            name: args.author,
            born: null
          })
          await author.save()
        }
        
        const book = new Book({
          title: args.title,
          author: author,
          published: args.published,
          genres: args.genres
        })
        await book.save()
        author.books = author.books.concat(book)

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

      } catch (e) {
        console.log(e)

        throw new UserInputError(e.message, {

          invalidArgs: args,
        })
      }
    },

    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("Not authenticated, you must login first")
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    },

    createUser: async (root, args) => {
      const user = await User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      try {
        return await user.save()
      } catch (e) {
        console.log(e)

        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      console.log(user)
      if( !user || args.password !== 'secret') {
        throw new UserInputError('Wrong username or password')
      }

      const userForToken = {
        username: user.username,
        id: user.id,
        favoriteGenre: user.favoriteGenre
      }
      console.log(userForToken)

      return { token: jwt.sign(userForToken, JWT_SECRET), user: userForToken}
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
      .findById(decodedToken.id)
      return { currentUser }
    }
  }
})
 
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})