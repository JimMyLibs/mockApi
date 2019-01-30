import Mock from 'mockjs'
let Random = Mock.Random;
// Mock.setup({
//     timeout: '200-600'// 响应时间
// })
// 配置API接口地址
let example = {
    getData: (res,data={},args={ret:'0000',success:''})=> {
        if (args.ret == '0000') {
            const msg = Mock.mock({
                respCode: args.ret,
                message: args.success ? ('模拟数据：' + args.success) : '模拟数据',
                errorMessage: '',
                errorMessageDetail: '',
                data,
            })
            res.send(msg)
        } else {
            const msg = Mock.mock({
                respCode: args.ret,
                message: getErrMsg(args.ret),
                errorMessage: '',
                errorMessageDetail: '',
                data,                
            })
            res.send(msg)
        }
    },
}

module.exports = {
    app:{
        noticeMessage:{
            queryPage: (res)=>{
                example.getData(res,{
                    "items|0-15":[{
                        'acceptorType|1-2':1,	// 发送对象类型 1:所有人 2:自定义	byte	
                        'createManager|1':getMore('guid'),	// 发送人ID	int64	
                        'createManagerName|1':getMore('cname'),	// 发送人用户名	string	
                        'createTime|1':getMore('datetime'),		// double	
                        'department|1':getMore('cname'),	// 部门名称	string	
                        'id|100-999':1,	// 主键ID	int64	
                        'sendContent|1':getMore('cparagraph'),	// 公告内容	string	
                        'title|1':getMore('ctitle',6,30),	// 公告标题	string	
                        'updateManager|1':getMore('guid'),// 			
                        'updateManagerName':getMore('cname'),// 		
                    }],
                    "totalCount": Random.integer(1,9)*10,
                    "totalPage": 5
                })
            },
            queryDetail: (res)=>{
                example.getData(res,{
                    'acceptorType|1-2':1,	// 发送对象类型 1:所有人 2:自定义	byte	
                    'createManager|1':Random.guid(),	// 发送人ID	int64	
                    'createManagerName|1':Random.cname(),	// 发送人用户名	string	
                    'createTime|1':Random.date(),		// double	
                    'department|1':Random.cname(),	// 部门名称	string	
                    'id|100-999':1,	// 主键ID	int64	
                    'sendContent|1':Random.cparagraph(3,9),	// 公告内容	string	
                    'title|1':Random.ctitle(6,30),	// 公告标题	string	
                    'updateManager|1':Random.guid(),// 			
                    'updateManagerName':Random.cname(),// 
                })
            }
        },
        message:{
            queryPage: (res)=>{
                example.getData(res,{
                    "items|0-9":[{
                        'acceptorType|1-2':1,	// 发送对象类型 1:所有人 2:自定义	byte	
                        'createTime|1':getMore('datetime'),		// double	
                        'id|100-999':1,	// 主键ID	int64	
                        'isRead1-2':1,//是否已读	byte
                        'mobileNo|1':getMore('string', 'number', 11),// 手机号	string	
                        'publishName|1':getMore('cname'),// 发布人姓名	string	
                        'receiveName|1':getMore('cname'),// 接收人姓名	string
                        'sendContent|1':getMore('cparagraph'),	// 公告内容	string	
                        'title|1':getMore('ctitle',6,50),	// 公告标题	string		
                    }],
                    "totalCount": Random.integer(1,9)*10,
                    "totalPage": 5
                })
            }
        },
        user:{
            queryById: (res)=>{
                example.getData(res,{
                    'createTime':Random.datetime(),// double	
                    'createUser':Random.cname(),// int64	
                    'departmentCode':Random.word(),// 部门编号	string	
                    'departmentId':Random.id(),// 部门ID	int64	
                    'departmentName':Random.cname(),// 部门名称	string	
                    'email':Random.email(),// 邮箱地址	string	
                    'gender|1-2':1,// 性别(1、男 2、女)	byte	
                    'mobile':'13000000001',// 移动电话电话	string	
                    'position':Random.cname(),// 职位	string	
                    'realName':Random.cname(),// 用户姓名	string	
                    'remark':Random.ctitle(),// 备注	string	
                    'roleIds':getMore('id'),// 角色ID集合	array	
                    'roleNames':getMore('cname'),// 角色名称集合	array	
                    'status|0-1':0,// 状态 1 开启，0 关闭	byte	
                    'telephone':Random.string('number',8),// 固定电话	string	
                    'updateTime':Random.datetime(),// double	
                    'updateUser':Random.cname(),// int64	
                    'userCode':Random.guid(),// 工号	string	
                    'userId':Random.id(),// 用户ID	int64	
                    'userName':Random.cname(),// 用户名	string
                    'materialStatus|0-3':0// 审核状态：0 未填写，1 未审核， 2 审核通过， 3 审核不通过
                })
            },
            update: (res)=>{
                example.getData(res)
            },
            updatePassword: (res)=>{
                example.getData(res)
            }
        },
        leaveMessage:{
            queryList: (res)=>{
                example.getData(res,{
                    "items|0-3":[{
                        'askContent|1':getMore('cparagraph'),// 内容	string	
                        'createTime|1':getMore('datetime'),// 创建时间	double	
                        'id|1':getMore('id'),// int64	
                        'userName|1':Random.cname(),// 用户名称	string	
                        'replyList|0-3':[{
                            'askContent|1':getMore('cparagraph'),// 内容	string	
                            'createTime|1':getMore('datetime'),// 创建时间	double	
                            'id|1':getMore('id'),// int64	
                            'userName|1':getMore('cname'),// 回复人	string	
                            'imageList|0-5':getMoreImg('image'),// 图片地址列表	array	
                        }]
                    }],
                    "totalCount": Random.integer(1,9)*10,
                    "totalPage": 5
                })
            },
            add: (res)=>{
                example.getData(res,{
                    'askContent|1':getMore('cparagraph'),// 内容	string	
                    'createTime|1':getMore('datetime'),// 创建时间	double	
                    'id|1':getMore('id'),// int64	
                    'replayStatus|0-1':0,// 回复状态 0 未回复 1 已回复	byte	
                    'userName|1':Random.cname(),// 用户名称	string	
                    'userType|1-3':1,// 用户类型 ：1、公司员工 2、供应商用户，3 经销商用户	byte
                    'replyList':[],
                })
            },
            replay: (res)=>{
                example.getData(res)
            }
        },
        company:{
            updateDetail: (res)=>{
                example.getData(res)
            },
            queryOne: (res)=>{
                example.getData(res,{
                    'id':Random.id(),// field.comment	body	false	int64	
                    'createTime':Random.datetime(),// field.comment	body	false	double
                    'materialStatus|0-3':1,// 审核状态：0 未填写，1 未审核， 2 审核通过， 3 审核不通过
                    'realName':Random.cname(),// 用户姓名	body	false	string		
                    'departmentId':Random.id(),// 部门ID	body	false	int64	
                    'departmentName':Random.cname()+'部门',// 部门名称	body	false	string
                    'mobile':Random.string('number',11),// 注册手机号	body	false	string	
                    'idCard':Random.string('number',18),// 身份证号	body	false	string
                    'companyName':'深圳市'+Random.ctitle()+'科技公司',// 单位名称	body	false	string			
                    'address':Random.county(true),// 地址	body	false	string	
                    'area':Random.region(),// 区域	body	false	string		
                    'idCardUrls':Random.image()+','+Random.image(),// 证件照	body	false	string	
                    'businessLicenseUrls':Random.image(),// 公司营业执照	body	false	string	
                    'handIdCardUrls':Random.image(),// 手持身份证照	body	false	string
                })
            }
        },
        file:{
            uploadBase64: (res)=>{
                example.getData(res,{	
                    'url':Random.image(),// 公司营业执照	body	false	string
                })
            }
        },
        contractAudit:{
            querySignUserList: (res)=>{
                example.getData(res,{
                    "items|0-9":[{
                        'id|100-999':1,	// 主键ID	int64	
                        'name|1':getMore('cname'),// 发布人姓名	string	
                    }],
                })
            }
        },
    }
}









let getMore = function (type, arg1 = '', arg2 = '', num=50) {
    let items = new Array;
    for (let i = 1; i < num + Math.ceil(Math.random() * num.toString().length); i++) {
        if (arg1) {
            items = items.concat([Random[type](arg1, arg2)]);
        } else {
            items = items.concat([Random[type]()]);
        }
    }
    return items;
}
let getMoreImg = function (type, arg1 = Random.integer(100,300)+'x'+Random.integer(100,700), arg2 = Random.color(), num=1) {
    let items = new Array;
    for (let i = 1; i < num + Math.ceil(Math.random() * num.toString().length); i++) {
        if (arg1) {
            items = items.concat([Random[type](arg1, arg2)]);
        } else {
            items = items.concat([Random[type]()]);
        }
    }
    return items;
}
let getErrMsg = function (ret) {
    switch (ret) {
        case '0000': return '成功';
        case '0001': return '失败';
        case '0002': return '未知错误';
        case '0003': return '未绑定APP帐号';
        case '0004': return '未登录';
        case '0005': return '无权限操作';        
    }
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