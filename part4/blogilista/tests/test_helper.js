const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title":"Sepon ristiretki",
    "author":"Seppo Tepponen",
    "url":"seponurl.fi",
    "likes":1,
  },
  {
  "title":"Tepon Huoltoasema",
  "author":"Teppo Sepponen",
  "url":"shell.fi",
  "likes":2,
},
{
  "title":"esimerkki",
  "author":"Keijo Tepponen",
  "url":"www.neste.fi",
  "likes":2,
}
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.json)
}

module.exports = {initialBlogs, blogsInDB}