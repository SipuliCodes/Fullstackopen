import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async details => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, details, config)
  return response.data
}

const like = async (details, id) => {
  const url = `${baseUrl}/${id}`

  const response = await axios.put(url, details)
  return response.data
}

const comment = async (comment, id) => {
  const url = `${baseUrl}/${id}/comments`

  const response = await axios.post(url, comment)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${id}`

  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, setToken, like,comment,  remove }