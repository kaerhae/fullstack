var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  const testi = blogs.map(blogs => blogs.likes)

  return testi.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const testi = blogs.reduce((accumulator, current) => (accumulator.likes > current.likes) ? accumulator : current)
  const destructed = ({title, author, likes}) => ({title, author, likes})

  return destructed(testi)

}


const mostBlogs = (blogs) => {

    const testi = blogs.map(blogs => blogs.author)
    const result = _.head(_(testi).countBy().entries().maxBy(_.last))


    const getCount = (arr, value) => {
      return arr.filter((v) => (v === value)).length
    }

    const objectStruct = (author, blogs) => {
      const obj = {
        author: author,
        blogs: blogs
      }

      return obj
    }

    return objectStruct(result, getCount(testi, result))

}

const mostLikes = (blogs) => {
  
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}