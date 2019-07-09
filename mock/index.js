import Mock from 'mockjs'

// for mock server
const responseFake = (url, type, respond) => {
    return {
        url: new RegExp(`/mock${url}`),
        type: type || 'get',
        response(req, res) {
            res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
        }
    }
}

export default mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
})
