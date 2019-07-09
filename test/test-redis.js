async function test() {
    const Redis = require('ioredis')

    const redis = new Redis({
        port: 6379,
        password: 123456
    })


    await redis.setex('c', 10 , 123)
    const keys = await redis.keys('*')
    console.log(keys)
    console.log(await redis.get('b'))
}

test()
