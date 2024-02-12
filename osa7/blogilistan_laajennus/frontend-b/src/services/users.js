import axios from "axios"
const baseUrl = "http://localhost:3003/api/users"

const getAll = async () => {
  const users = await axios.get(baseUrl)
  return users
}

export default { getAll }