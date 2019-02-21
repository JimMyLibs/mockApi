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
/*********************************** 通用：万中取一 ***********************************/
// 数据 type:数据类型,min:最小值,max:最大值,size:枚举数量
export const getMore = function (type, min = '', max = '', size=10) {
    let items = new Array;
    for (let i = 0; i < size; i++) {
        items = items.concat(JSON.parse(JSON.stringify(type)));
    }
    items.map(item=> {
        if (min) {
            item = Random[item](min, max);
        } else {
            if (isObject(item)) {// 对象
                Object.keys(item).map(cell=>{
                    // console.log('getMore__________________________________对象', item, index, !!Random[item[cell]])
                    item[cell] = Random[item[cell]] ? Random[item[cell]]() : item[cell];
                })
            } else if (isArray(item)) {// 数组
                // console.log('getMore__________________________________数组', item)
                
            } else {
                console.log('getMore__________________________________普通1', item)// 狸猫换太子，否则就变成二维数组了
                item = Random[item]();
                console.log('getMore__________________________________普通2', item)// 狸猫换太子，否则就变成二维数组了
            }
        }
    })
    return items;
}
/*********************************** 图片专用：万中取一 ***********************************/
export const getMoreImg = function (width = 200, height = 200, color = Random.color(), ext = 'png', text = '', size=50) {
    let items = new Array;
    for (let i = 0; i < size; i++) {
        items = items.concat('image');
    }
    items.map(item=> {
        if (min) {
            item = Random['image'](width+'x'+height,color,ext,text);
        } else {
            item = Random['image'](Random.integer(100,300)+'x'+Random.integer(100,700),Random.color(),ext,text);
        }
    })
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