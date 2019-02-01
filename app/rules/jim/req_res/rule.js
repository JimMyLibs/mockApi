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
    console.log('getRandom______', type, totalNum)
    if (totalNum) {
        return getMore(type).slice(0, pageSize)
    } else {
        return Random[type]()
    }
}
const loopArr = (arr, totalNum, pageSize) => {
    let item = arr[0];    
    if (isObject(item)) {// 对象
        console.log('对象2', item)
        return loop(item, totalNum, pageSize, true)
    } else if (isArray(item)) {// 数组
        console.log('数组2', item)
        return loopArr(item, totalNum, pageSize, true)
    } else {
        console.log('进来了2', item)// 狸猫换太子，否则就变成二维数组了
        return Random[item] ? getRandom(item, totalNum, pageSize) : item
    }
}
const loop = (args, totalNum = 0, pageSize = 0, isList = false) => {
    Object.keys(args).map(item => {
        if (isObject(args[item])) {// 对象
            console.log('对象1', item)
            if (item == 'totalNum') {// 总条数
                totalNum = args[Object.entries(args[item])[0][0]] = Object.entries(args[item])[0][1];
                delete args[item];
            } else if (item == 'pageSize') {// 总页码
                pageSize = args[Object.entries(args[item])[0][0]] = Object.entries(args[item])[0][1];
                delete args[item];
            } else {
                loop(args[item])
            }
        } else if (isArray(args[item])) {// 数组
            console.log('数组1', item)
            args[item] = loopArr(args[item], totalNum, pageSize)
        } else {
            console.log('进来了1', args, item, isList ? '是' : '否', '从数组中来')
            if (isList) {// 数组里面的项目
                if(Random[args[item]]){// 支持此语法
                    args = getRandom(args[item], totalNum, pageSize).map(cell=>{
                        let obj = {};
                        obj[args[item]] = cell;
                        return obj;
                    })
                }else{
                    args = args[item]
                }
            } else {
                args[item] = Random[args[item]] ? getRandom(args[item]) : args[item]
            }
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
