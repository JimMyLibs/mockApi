## 本条规则使用说明

> 通过请求地址，自动匹配对应的方法，需要自己编写接口mock方法（其实只需要复制粘贴）
```
- 示例1
    接口地址: /index/hd
    匹配方法: index.hd();
    
- 示例2
    接口地址: /index/bd-list
    匹配方法: index.bdList();
    
- 示例3
    接口地址: /index/all
    匹配方法: index.all();
```