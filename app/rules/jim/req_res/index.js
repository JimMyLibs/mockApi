import rule from './rule'

// js中字符串连接符转为驼峰
const camelCase = (string) => {
    return string.replace(/-([a-z])/g, function (all, letter) {
        return letter.toUpperCase()
    })
}
export default (app) => {
    app.post('*', (req, res, next) => {
        let { method, path, query, body, headers, headers: { origin } } = req;
        const arr = camelCase(path).split('/').filter(item => !!item);
        console.log('请求地址', path, arr)
        setTimeout(() => {
            try {
                arr.reduce((sum, item, index) => {
                    return sum[item]
                }, rule)(res, body)
            } catch (err) {                
                console.log('请求错误',err)
                let data = {
                    code: 200,
                    msg: '接口不在服务区',
                    method, path, query, body, headers, origin,
                }
                res.send(data)  
                next();                  
            }
        }, 100)
    })
}
