import Mock from 'mockjs'
import { getErrMsg, getMore, getMoreImg } from '../utils/index'
import { detail } from '../utils/api'
const Random = Mock.Random;

// 配置API接口地址
const example = {
    getData: (res, data = {}, args = { ret: '10000', success: '' }) => {
        if (args.ret == '10000') {
            const msg = Mock.mock({
                ret: args.ret,
                message: args.success ? ('模拟数据：' + args.success) : '模拟数据',
                data,
            })
            res.send(msg)
        } else {
            const msg = Mock.mock({
                ret: args.ret,
                message: getErrMsg(args.ret),
                data,
            })
            res.send(msg)
        }
    },
}
/******************************************** 数组类型：constructor *************************************************/
const isArray = function (arr) {
    return arr.constructor == Array;
}
/******************************************** 对象类型：constructor *************************************************/
const isObject = function (obj) {
    return obj.constructor == Object;
}
const getRandom = (type, totalNum, pageSize = 10) => {
    console.log('getRandom______',type,totalNum)
    if(totalNum){
        return getMore(type,totalNum,totalNum)
    }else{        
        return Random[type]()
    }
}
const loopArr = (arr) => {
    return arr.map(item => {
        if (isObject(item)) {// 对象
            console.log('对象2', item)
            return loop(item)
        } else if (isArray(item)) {// 数组
            console.log('数组2', item)
            return loopArr(item)
        } else {
            console.log('进来了2', item)
            return Random[item] ? getRandom(item) : item
        }
    })
}
const loop = (args) => {
    Object.keys(args).map(item => {
        if (isObject(args[item])) {// 对象
            console.log('对象1', item)
            if(item == 'totalNum'){// 总条数
                args[Object.entries(args[item])[0][0]] = Object.entries(args[item])[0][1];
                delete args[item];
            }else if(item == 'pageSize'){// 总页码
                args[Object.entries(args[item])[0][0]] = Object.entries(args[item])[0][1];
                delete args[item];            
            }else{
                loop(args[item])
            }
        } else if (isArray(args[item])) {// 数组
            console.log('数组1', item)
            args[item] = loopArr(args[item])
        } else {
            console.log('进来了1', item)
            args[item] = Random[args[item]] ? getRandom(args[item]) : args[item]
        }
    })
    return args;
}
export default {
    index: {
        default: (res, args) => {
            console.log('args', args)
            const msg = loop(args);
            console.log('msg', msg)
            example.getData(res, msg)
        },
    }
}
