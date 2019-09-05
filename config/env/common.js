
const github_auth_scope = 'user'

module.exports = {
  github: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    github_token_url: 'https://github.com/login/oauth/access_token',
    github_auth_url: `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=${github_auth_scope}`
  }
}
