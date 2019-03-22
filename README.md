# mockApi
mock模拟数据接口 [在线体验: demo](http://mock.91525.net)

> [我要用的字段，你这里面没有！我有新字段需求要提交](https://github.com/JimMyLibs/mockApi/issues/4)

![postman截图](https://note.youdao.com/yws/public/resource/367cb1e7e2dad4b943cdf1c53c776613/xmlnote/C207D409E2FA4DCBB1830984F258EFC3/6942)

### 使用方法
```
git clone https://github.com/JimMyLibs/mockApi.git
cd mockApi
npm install
// 启动项目
node index.js
```
> 如果想快速调试，请安装nodemon
```
npm install -g nodemon
npm install --save-dev nodemon
// 启动项目
nodemon
```
---

### 使用规则
> 默认选择作者jim名下的req_res模拟规则，详情查看[具体规则](https://github.com/JimMyLibs/mockApi/tree/master/app/rules/jim/req_res)
```
// 作者: jim  规则: req_res
// 使用方法: 将返回字段及其格式，以请求参数的形式发送给接口
fetch('http://mock.91525.net:3001/**/**',{
	mock:{
		id: 'id',
		name: 'cname'
	}
})
// 响应信息
{
    "ret": "10000",
    "message": "模拟数据",
    "data": {
        "id": "360000201401253686",
        "name": "马云",
    }
}
```
> 根据请求参数，选择某个作者及其名下的模拟规则，详情查看[具体规则](https://github.com/JimMyLibs/mockApi/tree/master/app/rules/jim/url_fn)
```
// 作者: jim  规则: req_res
// 使用方法: 将返回字段及其格式，以请求参数的形式发送给接口
fetch('http://mock.91525.net:3001/index/all',{
	"mock":{
		"auth":"jim",
		"rule":"url_fn"
	}
})
// 响应信息
{
    "ret": "10000",
    "message": "模拟数据",
    "data": {
        // 自己配置
    }
}
```
---

### 目录结构
```
├── app/        // 业务代码
│   ├── index.js        // 接口配置
│   └── rules/      // 规则目录
│       ├── index.js        // 规则入口
│       └── jim/        // 某规则负责人目录
│           ├── index.js        // 该规则包入口
│           ├── url_fn/     // 单条规则目录
│           │   ├── index.js        // 该条规则入口
│           │   └── rule.js     // 该条规则内容
│           └── utils/      // 该规则包的工具包
│               ├── api.js      // Mockjs Api一览表
│               └── index.js        // 工具包内容
├── index.js        // 程序入口lj
├── LICENSE     // 开原协议
├── node_modules/       // 依赖包
├── package.json        // 依赖包
└── README.md       // 说明文件
```
---
## 目前已支持字段

### 常用字段
```
id: "320000200904181643", // ID
cname: "贺明", // 姓名
username: "jim001", // 用户名
tel: "0595-20679780", // 固话号码
phone: "18921558010", // 手机号码
idCard: "617512200803104130", // 身份证号码
bankCard: "6226092484148081", // 银行卡号码
email: "towq456@iruihm.com", // 邮箱地址
qq: "55568995102", // QQ号
carNum: "桂ZM4KNP警", // 车牌号
icon: "http://dummyimage.com/64x64", // 图标
detailAddress: "北京 北京市 海淀区 铁新里路58号" // 详细地址

```
### 分页字段
```
pageSize: 10, // 每页条数
totalNum: 23, // 总条数
curPage: 3， // 当前页码

```
### 自定义分页字段
```
pageSize: { pageSizeName: 10 }, // pageSizeName: 每页条数字段
totalNum: { totalNumName: 23 }, // totalNumName: 总条数字段
curPage: { curPageName: 3 }, // curPageName: 当前页码字段

```

### Mockjs原生字段

#### Basic：基础数据类型
```
boolean: 布尔型
natural: 自然数[16位随机数]
integer: 整数[16位随机数]
float: 浮点型
character: 字母
string: 随机字符串
range: 数字范围
```
#### Date：日期
```
date: 日期('yyyy-MM-dd')
time: 时间('HH:mm:ss')[24小时]
datetime: 日期时间('yyyy-MM-dd HH:mm:ss')
now: 当前时间('yyyy-MM-dd HH:mm:ss')
```
#### Image：图片
```
image: 图片
dataImage: base64
```
#### Color：颜色
```
color:
hex:
rgb:
rgba:
hsl:
```
#### Text：文本
```
paragraph:
sentence:
word:
title:
cparagraph:
csentence:
cword:
ctitle:
```
#### Name：名称
```
first: 名
last: 姓
name: 姓名
cfirst:
clast:
cname:
```
#### Web：网络
```
url:
domain:
protocol: URL 的协议
tld: 域名后缀
email:
ip:
```
#### Address：地址
```
region: 地区
province: 省
city:
county: 县
zip: 邮政编码
```
#### Helper：转换助手(参数必填)
```
capitalize: 首字母大写
upper: 大写
lower: 小写
pick: 挑选
shuffle: 洗牌
```
#### Miscellaneous：其他
```
guid:
id:
increment: 递增
```