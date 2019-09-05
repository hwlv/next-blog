module.exports = {
  apps: [
    {
      name: 'next-blog',
      script: './server.js',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memmory_retart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
