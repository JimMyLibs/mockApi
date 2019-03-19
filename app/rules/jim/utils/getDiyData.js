import RandExp from 'randexp'
import { reg, regFn } from '../utils/regular'

export const getIdCard = ()=>{
    let idCard = new RandExp(reg.idCard18).gen();
    if(regFn.checkID(idCard)){
        console.log('成功',idCard,regFn.checkID(idCard))
        return idCard;
    }else{
        console.log('失败',idCard,regFn.checkID(idCard))
        return getIdCard();
    }
}
console.time('身份证')
getIdCard();
console.timeEnd('身份证')

export const getPhone = ()=>{
    const phone = new RandExp(reg.phone).gen();
    console.log('手机号',phone)
    return phone;
}
console.time('手机号')
getPhone();
console.timeEnd('手机号')

export const getUsername = ()=>{
    const username = new RandExp(reg.username).gen();
    console.log('用户名',username)
    return username;
}
console.time('用户名')
getUsername();
console.timeEnd('用户名')