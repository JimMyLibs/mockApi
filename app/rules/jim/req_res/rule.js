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
        default: (res) => {
            example.getData(res, detail)
        },
        all: (res) => {
            example.getData(res, detail)
        },
    }
}
