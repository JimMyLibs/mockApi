import Mock from 'mockjs'
import { getErrMsg, getMore, getMoreImg } from '../utils/index'
import { isArray, isObject } from '../utils/isType'
import { detail } from '../utils/api'
import { getRandom } from '../utils/getDiyData'
const Random = Mock.Random;


// 配置API接口地址
const example = {
    getData: (res, data = {}, args = { respCode: '0000', message: '' }) => {
        if (args.respCode == '0000') {
            const msg = {
                respCode: args.respCode,
                message: args.message ? ('模拟数据：' + args.message) : '模拟数据',
                data,
            }
            res.send(msg)
        } else {
            const msg = {
                respCode: args.respCode,
                message: getErrMsg(args.respCode),
                data:{},
            }
            res.send(msg)
        }
    },
}
const getArrRandom = (type, totalNum, curPage, pageSize) => {// 生成模拟数据: 数组类型模拟
    console.log('getArrRandom______', type, totalNum, curPage, pageSize)
    totalNum = totalNum || Random.integer(0,100);
    if(totalNum && pageSize){
        if(curPage == parseInt(totalNum / pageSize) + 1){
            return getMore(type).slice(0, parseInt(totalNum % pageSize))
        }else if(curPage > parseInt(totalNum / pageSize) + 1){
            return getMore(type).slice(0, 0)
        }else{
            return getMore(type).slice(0, pageSize, pageSize)
        }
    }else{
        if(!pageSize){
            return getMore(type).slice(0, totalNum)
        }
    }
}
const loopArr = (arr, totalNum, curPage, pageSize) => {// 二次数组递归
    let item = arr[0];    
    if (isObject(item)) {// 对象
        // console.log('对象2', item)
        return getArrRandom(item, totalNum, curPage, pageSize)
    } else if (isArray(item)) {// 数组
        // console.log('数组2', item)
        return loopArr(item, totalNum, curPage, pageSize)
    } else {
        // console.log('进来了2', item, !!Random[item])// 狸猫换太子，否则就变成二维数组了
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
        // console.log('对象1', item, args[item]);
        if (isObject(args[item])) {// 对象
            if(hasArr){
                // 自定义totalNum,curPage,pageSize字段
                if (item == 'totalNum') {// 总条数
                    totalNum = args[Object.entries(args[item])[0][0]] = Object.entries(args[item])[0][1];
                    delete args[item];
                } else if (item == 'curPage') {// 当前页
                    curPage = args[Object.entries(args[item])[0][0]] = Object.entries(args[item])[0][1];
                    delete args[item];
                } else if (item == 'pageSize') {// 总页码
                    pageSize = args[Object.entries(args[item])[0][0]] = Object.entries(args[item])[0][1];
                    delete args[item];
                } else {
                    loop(args[item])
                }
            }  else {
                loop(args[item])
            }
        } else if (isArray(args[item])) {// 数组
            // console.log('数组1', item)
            args[item] = loopArr(args[item], totalNum, curPage, pageSize)
        } else {
            // console.log('进来了1', item, isInList ? '是' : '否', '从数组中来')           
            // totalNum,curPage,pageSize 字段缺失
            if(hasArr){
                if(!argsKeys.includes('totalNum')){
                    args['totalNum'] = Random.integer(0,100);
                }
                if(!argsKeys.includes('curPage')){
                    args['curPage'] = 1;
                }
                if(!argsKeys.includes('pageSize')){
                    args['pageSize'] = 10;
                }
                // totalNum,curPage,pageSize 字段未自定义
                if (item == 'totalNum') {// 总条数
                    totalNum = args[item];
                } else if (item == 'curPage') {// 总页码
                    curPage = args[item];
                } else if (item == 'pageSize') {// 总页码
                    pageSize = args[item];
                }else{
                    args[item] = getRandom(args[item]);
                }
            }else{
                args[item] = getRandom(args[item]);
            }
        }
    })
    return args;
}
export default {
    index: {
        default: (res, args) => {
            // console.log('args', args)
            let argsInit = {
                respCode: "0000",
                message: "",
                data:{},
            }
            if(args.respCode){
                argsInit.respCode = args.respCode;
                argsInit.message = args.message || '';
                argsInit.data = args.data || {};
            }else{
                argsInit.data = args;
            }
            const { data } = argsInit;
            const msg = loop(data);
            // console.log('msg', msg)
            example.getData(res, msg, argsInit)
        },
    }
}
