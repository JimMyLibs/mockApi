// 参考：https://www.cnblogs.com/xinggood/p/6568624.html

/******************************************** 基本类型：typeof || constructor *************************************************/
export const isNumber = function (val) {
    return typeof (val) == 'number';
}
export const isBoolean = function (val) {
    return typeof (val) == 'boolean';
}
export const isString = function (val) {
    return typeof (val) == 'string';
}
export const isUndefined = function (val) {
    return typeof (val) == 'undefined';
}
export const isNull = function (val) {
    return typeof (val) == 'null';
}
export const isFunction = function (fn) {
    return typeof (fn) == 'function';
}
/******************************************** 数组类型：constructor *************************************************/
export const isArray = function (arr) {
    return arr.constructor == Array;
}
/******************************************** 对象类型：constructor *************************************************/
export const isObject = function (obj) {
    return obj.constructor == Object;
}
/******************************************** 判断未知对象的类型：constructor构造函数 *************************************************/
export const isArrayPlus = function (obj) {
    return typeof obj == 'object' && obj.constructor == Array;
}
/******************************************** 不同的框架iframe中，创建的数组是不会相互共享其prototype属性 *************************************************/
export const isArrayEnd = function (obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
}
/******************************************** 其他 *************************************************/
