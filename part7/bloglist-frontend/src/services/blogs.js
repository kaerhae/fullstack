import axios from 'axios'
const baseUrl = '/api/blogs/'
const baseUserUrl = '/api/users'
let token = null


const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject, id) => {
  const config = {
    headers: { Authorization: token },
  }
  const urlById = baseUrl + id
  const response = await axios.put(urlById, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const urlById = baseUrl + id
  const response = await axios.delete(urlById, config)
  return response.data
}

const getUsers = async () => {
  const response = await axios.get(baseUserUrl)
  return response.data
}

export default {
  getAll,
  setToken,
  create,
  update,
  remove,
  getUsers
}