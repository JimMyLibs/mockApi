import Mock from 'mockjs'
let Random = Mock.Random;
Mock.setup({
    timeout: '200-600'// 响应时间
})
// 配置API接口地址
let template = {
    getData: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {

                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
}
let advice = {
    getBusinessAdviceList: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {
                    'count|1-99': 1,// 总数
                    'answeredCount|1-99': 1,// 总数
                    'unansweredCount|1-99': 1,// 总数
                    'advices|0-10': [{
                        'content|1': getMore('ctitle'),// 内容
                        'status|1': [1, 2],// 受理状态
                        'replyContent|1': getMore('cparagraph'),// 回复内容
                        'urlList|1-10': ['https://cn.vuejs.org/images/logo.png'],// 上传图片
                        'createDate|1': getMore('datetime'),// 咨询时间
                        'replayDate|1': getMore('datetime'),// 回复时间                        
                    }],
                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
}
let image = {
    upload: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {
                    url: 'https://cn.vuejs.org/images/logo.png',
                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
}
let user = {
    updateContactInfo: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {

                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    getSubUserLog: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {
                    'count|1-99': 1,
                    'actList|9': [{
                        'actId|1': getMore('id'),
                        'actName|1': getMore('cname'),
                    }],
                    'logList|5-10': [{
                        'nickname|1': getMore('string', 'number', 5),// 子帐号ID
                        'actDesc|1': getMore('ctitle'),// 手机号
                        'createDate|1': getMore('datetime'),// 创建时间
                    }],
                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    getBusinessSubUser: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {
                    name: Random.cname(),// 姓名
                    id: Random.string('number', 5),// 账户ID
                    phone: '188' + Random.string('number', 8),// 账户账号
                    mail: Random.email(),// 邮箱
                    roleId: Random.string('number', 5),// 角色ID
                    'initPassword|1': [0, 1],// 子账号是否需要重置密码
                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    initCreateUserRole: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {
                    'roles|1-30': [{
                        'roleId|1': getMore('string', 'number', 2),// 登录角色
                        'roleName|1': getMore('cname'),// 登录角色
                    }],
                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    createSubUser: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {

                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    getSubUserList: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {
                    'isVerify|1': ['1', '2'],// 是否审核
                    'users|5-10': [{
                        'id|1': getMore('string', 'number', 5),// 子帐号ID
                        'phone|1': getMore('string', 'number', 11),// 手机号
                        'status|1': [1, 2],// 状态
                        'createDate|1': getMore('datetime'),// 创建时间
                        'roles|1-30': [{
                            'roleId|1': getMore('string', 'number', 2),// 登录角色
                            'roleName|1': getMore('cname'),// 登录角色
                        }],
                    }],
                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    login: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
                ret: args.ret,
                message: '模拟数据',
                "success": true,
                "data": {
                    /*                    'menus|8-8':[{
                                            'id|1':getMore('id'),
                                            'name|1':getMore('cname'),
                                            'href|1':getMore('cname'),
                                            'layer|1-2':1,
                                            'icon|1':'https://cn.vuejs.org/images/logo.png',
                                            'isShow|0-1':1,                        
                                        }],*/
                    'menus': [
                        {
                            'id|1': getMore('id'),
                            'name': '账户中心',
                            'href': '/mem',
                            'layer|1-2': 1,
                            'icon|1': 'https://cn.vuejs.org/images/logo.png',
                            'isShow': 1,
                        },
                        {
                            'id|1': getMore('id'),
                            'name': '账户管理',
                            'href': '/mem/acountMg',
                            'layer|1-2': 1,
                            'icon|1': 'https://cn.vuejs.org/images/logo.png',
                            'isShow': 1,
                            menus: [
                                {
                                    'id|1': getMore('id'),
                                    'name': '账户信息',
                                    'href': '/mem/acountInfo',
                                    'layer|1-2': 1,
                                    'icon|1': 'https://cn.vuejs.org/images/logo.png',
                                    'isShow|0-1': 1,
                                },
                                {
                                    'id|1': getMore('id'),
                                    'name': '子账户管理',
                                    'href': '/mem/childMg',
                                    'layer|1-2': 1,
                                    'icon|1': 'https://cn.vuejs.org/images/logo.png',
                                    'isShow|0-1': 1,
                                },
                            ],
                        },
                    ],
                    'roles|1-8': Random.cname(),// 角色名
                    'permissions|1-8': Random.cname(),// 权限名
                    nickname: Random.cname(),
                    phone: 188 + Random.string('number', 8),
                    email: Random.email(),
                    businessName: '深圳市' + Random.cname() + '科技有限公司',
                    'businessType|1-9': 1,
                    businessUserId: Random.id(),
                    'verifyStatus|0-3': 0,
                    'activation|0-1': 0,
                    'accountType|1-2': 1,
                    token: Random.guid(),
                },
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    getBusinessUserInfo: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {
                    phone: '188' + Random.string('number', 8),// 账户账号
                    email: Random.email(),// 邮箱
                    'accountType|1-2': 1,// 账户类型
                    nickname: Random.cname(),// 昵称
                    'activation|0-1': 0,// 邮箱激活状态
                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    getBasicBusiness: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {
                    'balance|0-9999': 100,   // 账户余额
                    'surplusDay|0-100': 10,    // 可用天数
                    'workNum|0-100': 10,   // 工单数量
                    'verifyStatus|0-3': 0,  // 商家认证状态
                    'passwordStatus|0-1': 0,  // 是否已修改密码
                    'emailStatus|0-1': 0,  // 邮件是否激活
                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    getVerifyCode: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {

                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    updateNickName: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {

                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    updatePhone: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {

                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    updateMail: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {

                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    updatePassword: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {

                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    updateComName: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {

                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
}
let mail = {
    sendActiveUrl: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '激活邮件发送成功',
                data: {

                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
}
let product = {
    openProductList: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {
                    'products|0-4': [{
                        'code|1-100': 100,
                        'name|1': getMore('cname'),
                        'description|1': getMore('cparagraph'),
                        iconUrl: Random.image('200x200'),
                        'typeName|1': getMore('ctitle'),
                    }]
                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    recommendProductList: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {
                    'products|0-4': [{
                        'code|1-100': 100,
                        'name|1': getMore('cname'),
                        'description|1': getMore('cparagraph'),
                        iconUrl: Random.image('200x200'),
                        'typeName|1': getMore('ctitle'),
                    }]
                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
}
let business = {
    getBusinessInfo: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {
                    // 企业信息
                    'certificateType|1-2': 1,// 证件类型
                    businessName: '深圳市' + Random.cname() + '有限责任公司',//企业名称
                    'businessType|1-9': 1,//行业类型
                    address: Random.province() + Random.city() + Random.county() + Random.cname() + '街道' + Random.integer(1, 1000) + '号',//住所(注册所在地)
                    licenseNo: (Random.natural() + '' + Random.natural()).slice(0, 15),//营业执照号
                    // comTerm:'',//营业执照有效期：长期 ************【不走后台：判断取舍】
                    'licenseNoStartDate|1': [Random.date(), ''],// 营业执照起始日期
                    'licenseNoEndDate|1': [Random.date(), ''],// 营业执照截止日期
                    organizationNo: (Random.natural() + '' + Random.natural()).slice(0, 10),// 组织机构代码
                    creditCode: (Random.natural() + '' + Random.natural()).slice(0, 18),// 统一社会信用代码 ************【字段已定】************
                    // 法人信息
                    legalName: Random.cname(),//法定代表人姓名
                    legalIdcard: '142729199105233017',//法定代表人身份证号码
                    // legalIdcardTerm:'',// 身份证有效期：长期 ************【不走后台：判断取舍】
                    'legalIdcardStartDate|1': [Random.date(), ''],// 身份证起始日期
                    'legalIdcardEndDate|1': [Random.date(), ''],// 身份证截止日期
                    // 代理人信息
                    // author:'legaler',// 填写人身份 ************【不走后台：判断取舍】
                    agentName: Random.cname(),//代理人姓名
                    agentIdcard: '142729199105233017',// 代理人身份证号码
                    // agentIdcardTerm:'',// 身份证有效期：长期 ************【不走后台：判断取舍】
                    'agentIdcardStartDate|1': [Random.date(), ''],// 身份证起始日期
                    'agentIdcardEndDate|1': [Random.date(), ''],// 身份证截止日期   

                    licenseUrl: 'https://cn.vuejs.org/images/logo.png',// 营业执照URL
                    organizationNoImgUrl: 'https://www.runoob.com/wp-content/uploads/2016/02/react.png',// 组织机构代码URL
                    legalIdcardFrontImgUrl: 'http://www.runoob.com/wp-content/uploads/2016/09/angular2.png',// 法定代表人身份证正面照URL
                    legalIdcardReverseImgUrl: 'http://www.runoob.com/wp-content/uploads/2013/12/java.jpg',// 法定代表人身份证反面照URL                
                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    updateBusiness: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {

                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
    getBusinessVerifyInfo: function (args) {
        if (args.ret == 0) {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: '模拟数据',
                data: {
                    businessName: '深圳市' + Random.cname() + '有限责任公司',//企业名称
                    'verifyStatus|0-3': 0,  // 商家认证状态
                    verifyRemark: '审核备注' + Random.cparagraph(),
                    contactPerson: Random.cname(),
                    concatEmail: Random.email(),
                    concatPhone: Random.natural().toString().slice(0, 11),
                    'businessType|1-9': 1,//行业类型
                }
            })
        } else {
            return Mock.mock(apiUrl + args.url, {
                ret: args.ret,
                message: getErrMsg(args.ret),
                "success": false,
            })
        }
    },
}











let getMore = function (item, arg1 = '', arg2 = '') {
    let items = new Array;
    for (let i = 0; i < 100 + Math.ceil(Math.random() * 100); i++) {
        if (arg1) {
            items = items.concat([Random[item](arg1, arg2)]);
        } else {
            items = items.concat([Random[item]()]);
        }
    }
    return items;
}
let getErrMsg = function (ret) {
    switch (ret) {
        case 1001:
            return "其他错误";
        /** 系统不能处理 （一般情况是系统有bug） */
        case 1002:
            return "系统不能处理";
        /** 参数异常 */
        case 1003:
            return "参数异常";
        /** api层接口错误 */
        case 1004:
            return "api层接口错误";
        /** api层接口失败 */
        case 1005:
            return "api层接口失败";
        /** 不支持的请求参数 */
        case 1006:
            return "不支持的请求参数";
        /** 不支持的媒体类型*/
        case 1007:
            return "不支持的媒体类型";
        /** 当前登录用户无此权限*/
        case 1008:
            return "当前登录用户无此权限";
        /** 资源不存在 */
        case 1009:
            return "资源不存在";
        case 1010:
            return "未登录或者登录过期";
        case 1011:
            return "RSA加解密错误";

        case 20001:
            return "用户未登录";
        case 20002:
            return "无访问权限";
        case 20003:
            return "错误次数过多，请次日再试";
        case 20004:
            return "手机号码错误";
        case 20005:
            return "发送验证码类型错误";
        case 20006:
            return "登录失败";
        case 20007:
            return "密码错误";
        case 20008:
            return "验证码错误";
        case 20009:
            return "该用户已存在";
        case 20010:
            return "用户名或密码错误";
        case 20011:
            return "邮箱未激活";
        case 20012:
            return "验证码发送次数过多，请次日再试";
        case 20013:
            return "验证码发送次数过多,请次月再试";
        case 20014:
            return "邮件发送失败,请稍后再试";
        case 20015:
            return "参数错误";
        case 20016:
            return "记录不存在";
        case 20017:
            return "企业认证未完成";
        case 20018:
            return "抱歉，您有申请中的订单，请不要重复提交订单";
        case 20019:
            return "用户已被禁用";
        case 20020:
            return "两次新密码输入不一致";
        case 20021:
            return "账户不存在";
        case 20022:
            return "密码修改失败";
        case 20023:
            return "邮箱已是激活状态";
        case 20024:
            return "激活邮件已发送,请先处理";
        case 20025:
            return "对不起，该激活已经失效，请重新发送邮箱激活";
        case 20026:
            return "已存在相同激活成功邮箱,请修改邮箱";
        case 20027:
            return "输入的密码不正确";
        case 20028:
            return "原始密码不正确";
        case 20029:
            return "密码错误超过4次，还剩1次机会";
        case 20030:
            return "密码错误超过5次";
    }
}

// 返回在vue模板中的调用接口
export default {
    Random, user, product, mail, business, image, advice
}






/*****************************************************************************/
// 时间
function rangeDate(min, max) {
    var min = min,
        max = max,
        days = (new Date(max) - new Date(min)) / 1000 / 60 / 60 / 24,
        i = 0,
        len = Math.floor(days),
        dates = [];

    for (; i < len; i++) {
        dates.push(format(new Date(min).getTime() + 1000 * 60 * 60 * 24 * i));
    }
    return dates;
}
function format(date) {
    var dateString = new Date(date),
        month = (dateString.getMonth() + 1) < 10 ? '0' + (dateString.getMonth() + 1) : (dateString.getMonth() + 1),
        day = dateString.getDate() < 10 ? '0' + dateString.getDate() : dateString.getDate();
    return dateString.getFullYear() + '-' + month + '-' + day
}