require('dotenv').config()

const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./Models/Author')
const Book = require('./Models/Book')


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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (args.author) {
        books = books.filter(b => b.author === args.author)
      } 
      if (args.genre) {
        books = books.filter(b => b.genres.includes(args.genre))
      }
      return books
    },
    allAuthors: () => 
      authors.map(a => {
        const bookCount = books.filter(b => b.author === a.name)
        return {
          name: a.name,
          id: a.id,
          born: a.born,
          bookCount: bookCount.length
        }
      })
  }, 

  Mutation: {
    addBook: async (root, args) => {
      
      try {
        const checkAuthor = await Author.findOne({ name: args.author })

        if (!checkAuthor) {
          const author = new Author({
            name: args.author,
            born: null
          })
          checkAuthor = await author.save()
        }
        

        console.log(checkAuthor)
        const book = new Book({
          title: args.title,
          author: checkAuthor,
          published: args.published,
          genres: args.genres
        })
        console.log(book, 'täs')
        await book.save()
      } catch (e) {
        console.log(e)

        throw new UserInputError(e.message, {

          invalidArgs: args,
        })

      }
    },

    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)

      if (!author) {
        return null
      }

      const updatedYear = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedYear : a)
      return updatedYear
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
 
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})