import axios from 'axios'

const comment = async (id, comment) => {
  const url = `/api/blogs/${id}/comments`
  const response = await axios.post(url, comment)
  return response.data
}

export default { comment }