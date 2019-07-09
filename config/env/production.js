
module.exports = {
    db:process.env.DB_HOST,
    database: process.env.DB_HOST,
    user: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    github:{
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        github_auth_url: 'https://github.com/login/oauth/authorize?client_id='+process.env.CLIENT_ID
    }
}
