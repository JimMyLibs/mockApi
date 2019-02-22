## 本条规则使用说明

> 分页相关字段命名说明：totalNum,curPage,pageSize
```
// 直接使用totalNum,curPage,pageSize字段
"pageSize":10,
"totalNum":23,
"curPage":3
```
```
// 自定义totalNum,curPage,pageSize字段
"pageSize": {
    "pageSizeName": 10
},
"totalNum": {
    "totalNumName": 23
},
"curPage": {
    "curPageName": 3
}
```
> 分页相关字段默认值：
```
totalNum: 0-100随机,
curPage: 1,
pageSize: 10
```

> 通过请求字段，决定响应字段，不需编写接口
```
- 示例1

```

> 待开发需求
 1.  常用字段：phone,username,idCard,icon