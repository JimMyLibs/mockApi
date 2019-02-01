import rule from './rule'

export default (req, res) => {
    const { method, path, query, body, body: { mock }, headers } = req;
    setTimeout(() => {
        try {
            rule.index.default(res, mock);
        } catch (err) {
            console.log('请求错误', err)
            let data = {
                code: 200,
                msg: '接口不在服务区',
                errDetail: 'jim/url_fn',
                method, path, query, body, headers,
            }
            res.send(data)
        }
    }, 100)
}
