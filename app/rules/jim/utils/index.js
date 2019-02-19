import Mock from 'mockjs'
import { isArray, isObject } from '../utils/isType'
const Random = Mock.Random;

/*********************************** 错误码 ***********************************/
export const getErrMsg = function (ret) {
    switch (ret) {
        case 10000: return '成功';
        // 登录：10000-10009
        case 10002: return '登录信息过期，请重新登录';
        case 10003: return 'token过期';
        case 10004: return '用户未登录，token不存在';
        // 图形验证码：10010-10019
        case 10011: return '验证码过期，请重试';
        case 10012: return '验证码错误，请重试';
        case 10013: return '图形验证码失效，请重新获取';
        // 订单：10020-10029      
    }
}
/*********************************** 数组专用：万中取一 ***********************************/
// 数据 type:数据类型,min:最小值,max:最大值,size:枚举数量
export const getMore = function (type, min = '', max = '', size=50) {
    let items = new Array;
    for (let i = 1; i < size + Math.ceil(Math.random() * size.toString().length); i++) {
        if (min) {
            items = items.concat([Random[type](min, max)]);
        } else {
            if (isObject(type)) {// 对象
                console.log('getMore——对象', type)
                Object.keys(type).map(cell=>{
                    type[cell] = Random[type[cell]] ? Random[type[cell]]() : type[cell];
                })
                items = items.concat([type]);
            } else if (isArray(type)) {// 数组
                console.log('getMore——数组', type)
                
            } else {
                console.log('getMore——普通', type)// 狸猫换太子，否则就变成二维数组了
                items = items.concat([Random[type]()]);
            }
        }
    }
    return items;
}
// 图片
export const getMoreImg = function (type, min = Random.integer(100,300)+'x'+Random.integer(100,700), max = Random.color(), size=1) {
    let items = new Array;
    for (let i = 1; i < size + Math.ceil(Math.random() * size.toString().length); i++) {
        if (min) {
            items = items.concat([Random[type](min, max)]);
        } else {
            items = items.concat([Random[type]()]);
        }
    }
    return items;
}

/*********************************** 时间 ***********************************/
// 日期范围
export const rangeDate = (min, max) => {
        days = (new Date(max) - new Date(min)) / 1000 / 60 / 60 / 24,
        i = 0,
        len = Math.floor(days),
        dates = [];

    for (; i < len; i++) {
        dates.push(dateFormat(new Date(min).getTime() + 1000 * 60 * 60 * 24 * i));
    }
    return dates;
}
// 时间格式化
export const dateFormat = (date) => {
    const dateString = new Date(date),
        month = (dateString.getMonth() + 1) < 10 ? '0' + (dateString.getMonth() + 1) : (dateString.getMonth() + 1),
        day = dateString.getDate() < 10 ? '0' + dateString.getDate() : dateString.getDate();
    return dateString.getFullYear() + '-' + month + '-' + day
}