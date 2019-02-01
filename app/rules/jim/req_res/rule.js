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
const loopArr = (arr) => {
    return arr.map(item=>{
        if(isObject(item)){// 对象
            console.log('对象2',item)
            loop(item)
        }else if(isArray(item)){// 数组
            console.log('数组2',item)
            loopArr(item)
        }else{
            console.log('进来了2',item)
            return '456'
        }
    })
}
const loop = (args) => {
    Object.keys(args).map(item=>{
        if(isObject(args[item])){// 对象
            console.log('对象1',item)
            loop(args[item])
        }else if(isArray(args[item])){// 数组
            console.log('数组1',item)
            args[item] = loopArr(args[item])
        }else{
            console.log('进来了1',item)
            args[item] = '123'
        }
    })
    return args;
}
export default {
    index: {
        default: (res, args) => {
            console.log('args',args)
            const msg = loop(args);
            console.log('msg',msg)
            example.getData(res, msg)
        },
    }
}
