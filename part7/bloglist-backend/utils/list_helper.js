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

const favoriteBlogs = (blogs) => {
  const testi = blogs.reduce((accumulator, current) => (accumulator.likes > current.likes) ? accumulator : current)
  const destructed = ({ title, author, likes }) => ({ title, author, likes })
  return destructed(testi)
}

const mostBlogs = (blogs) => {
  const testi = blogs.map(b => b.author)
  const result = _.head(_(testi).countBy().entries().maxBy(_.last))
  const getCount = (arr, val) => {
    return arr.filter((v) => (v === val)).length
  }

  const objStruct = ( author, blogs ) => {
    const obj = {
      author: author,
      blogs: blogs
    }

    return obj
  }

  return objStruct(result, getCount(testi, result))
}

const mostLikes = ( blogs ) => {

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs
}