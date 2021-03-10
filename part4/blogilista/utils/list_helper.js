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
  return blogs.reduce((accumulator, current) => (accumulator.likes > current.likes) ? accumulator : current)
}


const mostBlogs = (blogs) => {

  // Todo
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}