const BASE_URL = 'http://localhost:3001' // Ajusta según tu backend

const helpFetch = () => {
  const token = localStorage.getItem('access_token')
  const customFetch = async (endpoint, options = {}) => {
    options.method = options.method || 'GET'
    options.headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    options.credentials = 'include'
    options.mode = 'cors'

    if (options.body && typeof options.body !== 'string') {
      options.body = JSON.stringify(options.body)
    }

    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, options)
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        return {
          error: true,
          status: res.status,
          msg: data.msg || res.statusText,
        }
      }
      return data
    } catch (error) {
      console.error('Error Fetching', error)
      return {
        error: true,
        status: 500,
        msg: error.message,
      }
    }
  }

  const get = (endpoint) => customFetch(endpoint)
  const post = (endpoint, options) => customFetch(endpoint, { ...options, method: 'POST' })
  const put = (endpoint, options) => customFetch(endpoint, { ...options, method: 'PUT' })
  const del = (endpoint, id) => customFetch(`${endpoint}/${id}`, { method: 'DELETE' })

  return { get, post, put, del }
}

export default helpFetch