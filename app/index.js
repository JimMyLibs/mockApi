import express from 'express'
import bodyParser from 'body-parser'
import Mock from 'mockjs'
import rules from './rules'

const app = express()

// 解析参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

// 设置允许跨域访问该服务.
app.all('*', (req, res, next) => {
    // Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Headers', 'Content-Type, token')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    if (req.method.toUpperCase() === 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
})
// use node mock file，使用当前node路由文件
rules(app, Mock)

app.listen(3001, () => console.log(`Example app listening on port 3001`))