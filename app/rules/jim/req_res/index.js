import rule from './rule'

export default (req, res) => {
    const { method, path, query, body, body: { mock }, headers } = req;
    setTimeout(() => {
        try {
            rule.index.default(res, mock);
        } catch (err) {
            console.log('请求错误', err)
            let data = {
                respCode: 200,
                message: 'jim/url_fn',
                data: {
                    detail: err.message
                }
            }
            res.send(data)
        }
    }, 100)
}
