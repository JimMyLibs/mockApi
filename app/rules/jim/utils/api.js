import Mock from 'mockjs'
import { getErrMsg, getMore, getMoreImg, } from './index'
const Random = Mock.Random;

export default {
    detail: (res) => {
        const msg = Mock.mock({
            // Basic：基础数据类型
            'boolean': Random.boolean(),// 布尔型       // ( min, max, current ):(1, 9, true)
            'natural': Random.natural(),// 自然数[16位随机数]     // ( min, max )
            'integer': Random.integer(1, 100),// 整数[16位随机数]       // ( min, max )
            'float': Random.float(1, 100, 2, 4),// 浮点数   // (min, max, dmin, dmax)[最小数,最大数,小数最小位数,小数最大位数]
            'character': Random.character(),// 字母     // (lower|upper|number|symbol|aeiou)[小写|大写|数字|符号|aeiou任选][pool]
            'string': Random.string(),// 随机字符串     // ( length )||( pool, length ) || ( min, max )||( pool, min, max )
            'range': Random.range(),// 数字范围     // ( max ) || ( min, max ) || ( min, max, step ) [setp: 间隔]
            // Date：日期
            'date': Random.date(),// 日期('yyyy-MM-dd')       // 
            'time': Random.time(),// 时间('HH:mm:ss')[24小时]       // ("A HH:mm:ss:SS")[上下午+毫秒]
            'datetime': Random.datetime(),// 日期时间('yyyy-MM-dd HH:mm:ss')      // ('yyyy-MM-dd A HH:mm:ss:SS')[上下午+毫秒]
            'now': Random.now(),// 当前时间('yyyy-MM-dd HH:mm:ss')     // (year|month|week|day|hour|minute|second) || ('day', 'yyyy-MM-dd HH:mm:ss SS')
            // Image：图片
            'image': Random.image(),// 图片     // ( size, bgColor, color, ext, text )[('200x100', '#894FC4', '#FFF', 'png', '图片文字')]
            'dataImage': Random.dataImage(),// base64     // ( size, text )[('200x100', '图片文字')]        // issues: nodejs不支持canvas渲染
            // Color：颜色
            'color': Random.color(),//      // [#f29779]
            'hex': Random.hex(),//      // [#f279c4]
            'rgb': Random.rgb(),//      // [rgb(181, 121, 242)]
            'rgba': Random.rgba(),//        // [rgba(121, 166, 242, 0.60)]
            'hsl': Random.hsl(),//      // [hsl(165, 82, 71)]
            // Text：文本
            'paragraph': Random.paragraph(),//      // ( min, max )[段落数量]
            'sentence': Random.sentence(),//        // ( min, max )[句子数量]
            'word': Random.word(),//        // ( min, max )[字母数量]
            'title': Random.title(),//      // ( min, max )[标题数量]
            'cparagraph': Random.cparagraph(),//        // 
            'csentence': Random.csentence(),//      // 
            'cword': Random.cword(),//      // ( pool, min, max )[字符串,随机数量范围]
            'ctitle': Random.ctitle(),//        // 
            // Name：名称
            'first': Random.first(),// 名     // 
            'last': Random.last(),// 姓       // 
            'name': Random.name(),// 姓名       // 
            'cfirst': Random.cfirst(),//        // 
            'clast': Random.clast(),//      // 
            'cname': Random.cname(),//      // 
            // Web：网络
            'url': Random.url(),//      // [telnet://epbiagi.net/kqcejrunfr]
            'domain': Random.domain(),//        // [vzg.gm]
            'protocol': Random.protocol(),// URL 的协议       // [ftp]
            'tld': Random.tld(),// 域名后缀     // [com]
            'email': Random.email(),//      // [w.cvomrwsg@myd.ch]
            'ip': Random.ip(),//        // [182.217.26.210]
            // Address：地址
            'region': Random.region(),// 地区       // [华南]
            'province': Random.province(),// 省       // [广东省]
            'city': Random.city(),//        // Random.city(true)[广东省 深圳市]
            'county': Random.county(),// 县       // Random.county(true)[广东省 深圳市 南山区]
            'zip': Random.zip(),// 邮政编码     // [518000]
            // Helper：转换助手(参数必填)
            'capitalize': Random.capitalize(),// 首字母大写       // ('hello')["Hello"]
            'upper': Random.upper(),// 大写     // ('hello')["HELLO"]
            'lower': Random.lower(),// 小写     // ('HELLO')["hello"]
            'pick': Random.pick(),// 挑选       // (['a', 'e', 'i', 'o', 'u'])["i"]
            'shuffle': Random.shuffle(),// 洗牌     // (['a', 'e', 'i', 'o', 'u'])[["u","i","a","e","o"]]
            // Miscellaneous：其他
            'guid': Random.guid(),//        // ["dc7ccFFA-dFB4-Bc31-77b1-BE1Ec7aC6D98"]
            'id': Random.id(),//        // ["510000199312155310"]
            'increment': Random.increment(),// 递增     // ( 100 )[以100递增]
        })
        res.send(msg)
    }
}