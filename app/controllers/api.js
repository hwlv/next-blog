const axios = require('axios')
const debug = require('debug')('server:github')

const github_base_url = 'https://api.github.com'

module.exports = async function (path, token) {
    const githubPath = `${github_base_url}${path.replace('/github/', '/')}`
    const headers = {}
    if (token) {
      headers['Authorization'] = `token ${
        token
      }`
    }
    debug(`proxy to ${githubPath}, with headers:`, headers)
    try {
      const res = await axios({
        method: 'GET',
        url: githubPath,
        headers,
      })
      return res
    } catch (err) {
      debug('proxy error:', err)
    }
}