import rule from './rule'

// js中字符串连接符转为驼峰
const camelCase = (string) => {
    return string.replace(/-([a-z])/g, function (all, letter) {
        return letter.toUpperCase()
    })
}
export default (req, res) => {
    const { method, path, query, body, headers } = req;
    const arr = camelCase(path).split('/').filter(item => !!item);
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
                errDetail: 'jim/url_fn下没有该接口对应的方法',
                method, path, query, body, headers,
            }
            res.send(data)             
        }
    }, 100)
}
