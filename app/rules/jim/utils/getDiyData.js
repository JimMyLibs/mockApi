import Mock from 'mockjs'
import RandExp from 'randexp'
import { reg, regFn } from '../utils/regular'
const Random = Mock.Random;


export const getRandom = (type) => {// 生成模拟数据: 数值类型模拟: 待处理
    console.log('getRandom______', type)
    if(type == 'phone'){
        return getPhone();
    }else if(type == 'username'){
        return getUsername();
    }else if(type == 'idCard'){
        return getIdCard();
    }else if(type == 'icon'){

    }else if(type == '未知'){

    }else if(type == '未知'){

    }else if(type == '未知'){

    }else if(type == '未知'){

    }else{
        return Random[type] ? Random[type]() : type;
    }
}

export const getPhone = ()=>{
    const phone = new RandExp(reg.phone).gen();
    console.log('手机号',phone)
    return phone;
}

export const getUsername = ()=>{
    const username = new RandExp(reg.username).gen();
    console.log('用户名',username)
    return username;
}

let getIdCardCount = 0;
export const getIdCard = ()=>{
    let idCard = new RandExp(reg.idCard18).gen();
    if(regFn.checkID(idCard)){
        console.log('经过'+getIdCardCount+'次失败，才成功',idCard,regFn.checkID(idCard))
        return idCard;
    }else{
        getIdCardCount++;
        // console.log('失败',idCard,regFn.checkID(idCard),getIdCardCount)
        return getIdCard();
    }
}
