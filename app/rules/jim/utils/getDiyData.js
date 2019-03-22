import Mock from 'mockjs'
import RandExp from 'randexp'
import { reg, regFn } from '../utils/regular'
const Random = Mock.Random;

export const getRandom = (type) => {// 生成模拟数据: 数值类型模拟: 待处理
    const regKeys = Object.keys(reg);
    const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAA4VBMVEUAAAAb3Moc3csc3Msc3csb3cwA//8c3MsY3s8d3coc3csb38wc3csZ380c4M0c3csc3csb3csb4Mwc3Msc3csX6NEY58gc3ssb3csd3csb3csc3csc3ssX4cwA/78d3coc3cob3swa3ssa3soV6tUA/8od3Msc3coX4M0b3coZ3swW3ssd3cvj//og3cwn387e//nM+/XU/fbF+vPB+fKC7+Rz7N9k6dxd6Ns949M24dEj3szZ/vjQ/Paf9OuV8ui7+PG19++p9e2L8OZ67eFt695r6t5V59hK5dZF5NQu4M62gji6AAAALHRSTlMAYMH72WgC8xXoUTeqTCPUrZAv5cgLCPXql5SAYhsEy358eiYMCdyJIXlGRTQ+dxUAAAIcSURBVEjH7ZbZVuJAEIZbm4QlJCQIOC64jY6zVAgquACK24zL+z/QmO6fHkzopMPFXHj8b6D61HeAr4Au9hHT7S6NenWiurcUWtnk9Ba+WSmMtvfLhJT3OoVQ26oKLorEQ9WyzdlaSTC989PT8554WqoZok6LRC5OwrecXMiq5RigX33Z/DQIkcGTPPG9PMUbXDS+3IVzuXsRh3wjS/zhllQ8ugkTuRlJ8VttDbpjfREdr9N+mEp/+grxOwsVf5PTGQJNZjKMdOKd3dl0Qm0wt6R4u6SmkxU1t5I9B++Lo6tBmJvBlWg9SMF0eZbHnl1SCl4hmd6f68x3/buHxpX3MDJ+nOjQyeOYSAMfQ1r0sHBW/YcIso6TsKhrVRIZTQGkv2JUddGsomprnaT3+/fovXRM6xZjWpjZAZdtz7f/0NtnecYDm2lhkSOf1NzUdET8o1Rzuu6uzs3tejad1W6yWVM3IX48HI6huMlYPoy4EA/FPxkrAEO8UmwOIwGXilEawxAf/7N0WFEYibWzT/gTVvXatm0C29trCdilOA03H3YbonW+87COX3wzG27if6LeTlx0OP6uhz28xK6ju2J5UFkMVwKOKzbrci8fdNJw50dZXe7ZawXEA4ZirBU5Cw3EA4ZiLDT5qxTEA1aKfc9siYP4mJopbjnF1kcef1Cl2Dg2xCNYXI3T3kutzP9lWYf4BlHDY8vG+cU+YP4CLTTF7Pn1EkcAAAAASUVORK5CYII=';
    // console.log('getRandom______', type)
    if(type == 'idCard'){
        return getIdCard();
    }else if(type == 'icon'){
        return Random.image('64x64');
    }else if(type == 'detailAddress'){
        return Random.county(true) + ' ' + Random.cword(2,3) + '路' + Random.integer(0,100) + '号';
    }else if(type == 'dataImage' || type == 'base64'){
        return base64;
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
