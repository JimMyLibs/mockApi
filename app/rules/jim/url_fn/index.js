import rule from './rule'

// js中字符串连接符转为驼峰
const camelCase = (string) => {
    // Support: IE9-11+
    return string.replace(/-([a-z])/g, function (all, letter) {
        return letter.toUpperCase()
    })
}
export default (app, Mock) => {
    app.post('*', (req, res, next) => {
        let { method, path, query, body, headers, headers: { origin } } = req;
        const arr = camelCase(path).split('/').filter(item => !!item);
        console.log('请求地址', path)
        setTimeout(() => {
            try {
                arr.reduce((sum, item, index) => {
                    return sum[item]
                }, rule)(res, body)
            } catch (err) {                
                console.log('请求错误',err)
                let data = Mock.mock({
                    code: 200,
                    msg: '接口不在服务区',
                    method, path, query, body, headers, origin,
                })
                res.send(data)  
                next();                  
            }
        }, 100)
    })
}
