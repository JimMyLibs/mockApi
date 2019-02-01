import ruleList from './ruleList'

export default (req, res) => {
    const { method, path, query, body, body: { mock: { auth, rule } }, headers } = req;
    if(rule){
        try {
            console.log('2、作者',auth,'规则',rule,'请求地址', path)
            ruleList[rule](req, res);
        } catch (err) {
            console.log('请求错误', err)
            let data = {
                code: 200,
                msg: '接口不在服务区',
                errDetail: '规则名称有误,请检查mock.rule',
                method, path, query, body, headers,
            }
            res.send(data)
        }
    }else{// 默认规则
        ruleList['req_res'](req, res);
    }
}