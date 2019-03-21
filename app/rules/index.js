import authList from './authList'

export default (app) => {
    app.post('*', (req, res, next) => {
        try{
            const { method, path, query, body, body: { mock }, headers } = req;
            if(mock){
                const { auth, rule } = mock;
                if (auth) {
                    try {
                        console.log('1、作者',auth,'规则',rule,'请求地址', path)
                        authList[auth](req, res);
                    } catch (err) {
                        console.log('请求错误2', err)
                        let data = {
                            respCode: 200,
                            message: '规则作者有误,请检查mock.auth',
                            data: {
                                detail: err.message
                            }
                        }
                        res.send(data)
                        next();
                    }
                } else {// 默认作者
                    authList['jim'](req, res);
                }
            }else{
                throw Error('参数错误,mock字段必填')
            }
        }catch(err){
            console.log('请求错误1', err)
            let data = {
                respCode: 200,
                message: err.message,
                data: {
                    detail: err.message
                }
            }
            res.send(data)
            next();
        }
    })
}