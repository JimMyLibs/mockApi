import Mock from 'mockjs'
import RandExp from 'randexp'
import { reg, regFn } from '../utils/regular'
const Random = Mock.Random;

export const getRandom = (type) => {// 生成模拟数据: 数值类型模拟: 待处理
    const regKeys = Object.keys(reg);
    // console.log('getRandom______', type)
    if(type == 'idCard'){
        return getIdCard();
    }else if(type == 'icon'){
        return Random.image('64x64');
    }else if(type == 'detailAddress'){
        return Random.county(true) + ' ' + Random.cword(2,3) + '路' + Random.integer(0,100) + '号';
    }else if(type == '未知'){

    }else if(regKeys.includes(type)){
        return getReg(type);
    }else{
        return Random[type] ? Random[type]() : type;
    }
}

export const getReg = (type)=>{
    console.time('正则'+type)
    const result = new RandExp(reg[type]).gen();
    console.timeEnd('正则'+type)
    return result;
}

let getIdCardCount = 0;
export const getIdCard = ()=>{
    let idCard = new RandExp(reg.idCard).gen();
    if(regFn.checkID(idCard)){
        console.log('经过'+getIdCardCount+'次失败，才成功',idCard)
        return idCard;
    }else{
        getIdCardCount++;
        // console.log('失败',idCard,getIdCardCount)
        return getIdCard();
    }
}
