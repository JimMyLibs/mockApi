import Mock from 'mockjs'
import { getErrMsg, getMore, getMoreImg } from '../utils/index'
import { detail } from '../utils/api'
const Random = Mock.Random;

// 配置API接口地址
const example = {
    getData: (res, data = {}, args = { ret: '10000', success: '' }) => {
        if (args.ret == '10000') {
            const msg = {
                ret: args.ret,
                message: args.success ? ('模拟数据：' + args.success) : '模拟数据',
                data,
            }
            res.send(msg)
        } else {
            const msg = {
                ret: args.ret,
                message: getErrMsg(args.ret),
                data,
            }
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
const getArrRandom = (type, totalNum, curPage, pageSize) => {// 生成模拟数据: 数组类型模拟
    console.log('getArrRandom______', type, totalNum)
    if(totalNum && pageSize){
        if(curPage == parseInt(totalNum / pageSize) + 1){
            return getMore(type).slice(0, parseInt(totalNum % pageSize))
        }else if(curPage > parseInt(totalNum / pageSize) + 1){
            return getMore(type).slice(0, 0)
        }else{
            return getMore(type).slice(0, pageSize, pageSize)
        }
    }else{
        totalNum = totalNum || Random.integer(0,100);
        if(!pageSize){
            return getMore(type).slice(0, totalNum)
        }
    }
}
const getRandom = (type) => {// 生成模拟数据: 数值类型模拟: 待处理
    console.log('getRandom______', type)
    return Random[type]()
}
const loopArr = (arr, totalNum, curPage, pageSize) => {// 二次数组递归
    let item = arr[0];    
    if (isObject(item)) {// 对象
        console.log('对象2', item)
        return loop(item, totalNum, curPage, pageSize, true)
    } else if (isArray(item)) {// 数组
        console.log('数组2', item)
        return loopArr(item, totalNum, curPage, pageSize, true)
    } else {
        console.log('进来了2', item)// 狸猫换太子，否则就变成二维数组了
        return Random[item] ? getArrRandom(item, totalNum, curPage, pageSize) : [item]
    }
}
const pageAttrPre = (arr) => {// totalNum,curPage,pageSize 在数组中前置: 待处理
    ['totalNum','curPage','pageSize'].map(item=>{
        if(arr.includes(item)){
            const curIndex = arr.indexOf(item);
            arr.splice(curIndex,1)
            arr.unshift(item);
        }
    }) 
    return arr;
}
const loop = (args, totalNum, curPage, pageSize, isInList = false) => {// 一次递归
    const argsKeys = pageAttrPre(Object.keys(args));
    const hasArr = argsKeys.some(item => isArray(args[item]));// 字段中存在数组
    argsKeys.map(item => {
        if (isObject(args[item])) {// 对象
            console.log('对象1', item);
            if(hasArr){
                // 自定义totalNum,curPage,pageSize字段
                if (item == 'totalNum') {// 总条数
                    totalNum = args[Object.entries(args[item])[0][0]] = Object.entries(args[item])[0][1];
                    delete args[item];
                } else if (item == 'curPage') {// 总页码
                    curPage = args[Object.entries(args[item])[0][0]] = Object.entries(args[item])[0][1];
                    delete args[item];
                } else if (item == 'pageSize') {// 总页码
                    pageSize = args[Object.entries(args[item])[0][0]] = Object.entries(args[item])[0][1];
                    delete args[item];
                }
            }  else {
                loop(args[item])
            }
        } else if (isArray(args[item])) {// 数组
            console.log('数组1', item)
            args[item] = loopArr(args[item], totalNum, curPage, pageSize)
        } else {
            console.log('进来了1', args, item, isInList ? '是' : '否', '从数组中来')
            if (isInList) {// 数组里面的项目
                if(Random[args[item]]){// 支持此语法
                    args = getArrRandom(args[item], totalNum, curPage, pageSize).map(cell=>{
                        let obj = {};
                        obj[args[item]] = cell;
                        return obj;
                    })
                }else{
                    args = args[item]
                }
            } else {              
                // totalNum,curPage,pageSize字段未自定义
                if (item == 'totalNum') {// 总条数
                    totalNum = args[item];
                } else if (item == 'curPage') {// 总页码
                    curPage = args[item];
                } else if (item == 'pageSize') {// 总页码
                    pageSize = args[item];
                }else{
                    args[item] = Random[args[item]] ? getRandom(args[item]) : args[item];
                }
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
