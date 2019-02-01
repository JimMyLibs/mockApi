import Mock from 'mockjs'
import { getErrMsg, getMore, getMoreImg } from '../utils/index'
import { detail } from '../utils/api'
const Random = Mock.Random;

// 配置API接口地址
const example = {
    getData: (res, data = {}, args = { ret: '10000', success: '' }) => {
        if (args.ret == '10000') {
            const msg = Mock.mock({
                ret: args.ret,
                message: args.success ? ('模拟数据：' + args.success) : '模拟数据',
                data,
            })
            res.send(msg)
        } else {
            const msg = Mock.mock({
                ret: args.ret,
                message: getErrMsg(args.ret),
                data,
            })
            res.send(msg)
        }
    },
}

export default {
    index: {
        hd: (res, args) => {// 接口: /app/index/list
            example.getData(res, {
                'detail': {
                    'image': Random.image(),
                },
                "list|0-15": [{
                    'sort|+1': 1,	// 主键ID	int64		
                    'number|1-999': 1,	// 主键ID	int64		
                    'id|1': getMore('id'),	// 发送人ID	int64	
                    'guid|1': getMore('guid'),	// 发送人ID	int64	
                    'datetime|1': getMore('datetime'),		// double	
                    'cname|1': getMore('cname'),	// 发送人用户名	string	
                    'title|1': getMore('ctitle', 6, 30),	// 公告标题	string		
                    'cparagraph|1': getMore('cparagraph'),	// 公告内容	string
                    'createTime|1': getMore('datetime'),
                    'mobile|1': getMore('string', 'number', 11),// 手机号	string
                    'imageList|0-5': getMoreImg('image'),// 图片地址列表	array
                    'companyName': '深圳市' + Random.ctitle() + '科技公司',// 单位名称	body	
                }],
                "totalCount": Random.integer(1, 9) * 10,
                "totalPage": 5
            })
        },
        bdList: (res) => {
            example.getData(res)
        },
        all: (res) => {
            example.getData(res, detail)
        },
    }
}
