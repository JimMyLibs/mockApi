import authList from './authList'

export default (app) => {
    app.post('*', (req, res, next) => {
        const { method, path, query, body, body: { mock: { auth, rule } }, headers } = req;
        if (auth) {
            try {
                console.log('1、作者',auth,'规则',rule,'请求地址', path)
                authList[auth](req, res);
            } catch (err) {
                console.log('请求错误', err)
                let data = {
                    code: 200,
                    msg: '接口不在服务区',
                    errDetail: '规则作者有误,请检查mock.auth',
                    method, path, query, body, headers,
                }
                res.send(data)
                next();
            }
        } else {// 默认作者
            authList['jim'](req, res);
        }
    })
}