// JavaScript RegExp 对象：http://www.runoob.com/jsref/jsref-obj-regexp.html
// 正则表达式 - 元字符：http://www.runoob.com/regexp/regexp-metachar.html
// 正则表达式在线测试：https://c.runoob.com/front-end/854
    /**************************** replace方法 ****************************/
    let rep = function(value,reg,pad=''){// 调用并未简化，封装待优化
        return value.replace(reg,pad)
    }
    /**************************** 通用：正则匹配 ****************************/
    let reg ={ 
        Az:/^[A-z]+$/,
        AZ:/^[A-Z]+$/,
        az:/^[a-z]+$/,
        num:/^[0-9]*$/,
        AzNum:/^[A-Za-z0-9]*$/,
        enOddCode:/[`~!@#$%^&*()=_+<>?:"{},\.\/;'\[\]\-￥€£●]/,
        cnOddCode:/[·！#￥（——）：；“”‘、，|《。》？、【】]/,
        oddCode:/[`~!@#$%^&*()=_+<>?:"{},\.\/;'\[\]\-￥€£●·！#￥（——）：；“”‘、，|《。》？、【】]/,
        // 账号/用户名:字母开头，允许5-16字节，允许字母数字下划线
        username:/^[a-zA-Z][a-zA-Z0-9_]{5,15}$/,
        // 密码:必须包含大小写字母和数字的组合
        AzNumEn_2_3:/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/,
        /**************************** 常用正则 ****************************/    
        // 手机号码段参考：https://baike.baidu.com/item/%E6%89%8B%E6%9C%BA%E5%8F%B7%E7%A0%81/1417348?fr=aladdin#2
        phone:/^(13[0-9]|14[5|7|9]|15[0-9]|166|17[0|1|3|5|6|7|8]|18[0-9]|19[8|9|1])\d{8}$/,
        /*邮箱校验*/
        email:/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
        // 微信号：6至20位，以字母开头，字母，数字，减号，下划线
        wechat:/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/,
        // QQ
        qq:/^[1-9][0-9]{4,13}$/,
        // 车牌
        carNum:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
        /*中文*/
        nameCn:/^[\u4e00-\u9fa5]+$/,
        /**身份证：粗略验证*/
        idCard:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X)$)/,
        idCard18: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        idCardDetail: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
        rgb:/(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i,
        url:/^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        ipV4:/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        base64:/^data:(.+?);base64,(.+)$/,// 返回Array: ["data:image/png;base64,iVB……", "image/png", "iVB……", index: 0, input: "data:image/png;base64,iVB……"]

    }
    /**************************** 计算个数 ****************************/
    let regNot = {        
        Az:/[^A-z]/g,
        AZ:/[^A-Z]/g,
        az:/[^a-z]/g,
        num:/[^\d]/g,
        enOddCode:/[^`~!@#$%^&*()=_+<>?:"{},\.\/;'\[\]\-￥€£●]/g,
        cnOddCode:/[^·！#￥（——）：；“”‘、，|《。》？、【】]/g,
        oddCode:/[^`~!@#$%^&*()=_+<>?:"{},\.\/;'\[\]\-￥€£●·！#￥（——）：；“”‘、，|《。》？、【】]/g,
        nameCn:/[^\u4e00-\u9fa5]/g,
    }
    let regFn = {
        nameCn (value) {// 中文姓名，只允许汉字+1个“·”
            return !((/[^·.\u4e00-\u9fa5]/.test(value)||value.indexOf("·")==0||value.indexOf("·")==(value.length-1))||value.replace(/[^·]/g,'').length>1)
        },
        nameCnPlus (value) {// 中文姓名，只允许汉字+1个“·”
            if(methods.nameCn(value)){
                if(value.indexOf("·")>-1){
                    return value.length>=3&&value.length<=15;
                }else{
                    return value.length>=2&&value.length<=8;                    
                }
            }
        },
        isValidImageType(fileName) {/*验证图片类型*/
            var temp=fileName.split(".");  
            var length=temp.length;  
            var ret=false;  
            var typeName=temp[length-1];
            typeName=typeName.toLowerCase();  
            if(""==fileName){  
                ret=true;  
            }         
            else if("jpg"==typeName  || "png"==typeName || "gif"==typeName || "jpeg"==typeName){  
                ret=true;  
            }  
            return ret;  
        },
        checkID(val) {
            // 省级地址码校验
            var checkProv = function (val) {
                var pattern = /^[1-9][0-9]/;
                var provs = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门"};
                if(pattern.test(val)) {
                    if(provs[val]) {
                        return true;
                    }
                }
                return false;
            }
            // 出生日期码校验
            var checkDate = function (val) {
                var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
                if(pattern.test(val)) {
                    var year = val.substring(0, 4);
                    var month = val.substring(4, 6);
                    var date = val.substring(6, 8);
                    var date2 = new Date(year+"-"+month+"-"+date);
                    if(date2 && date2.getMonth() == (parseInt(month) - 1)) {
                        return true;
                    }
                }
                return false;
            }
            // 校验码校验
            var checkCode = function (val) {
                var p = reg.idCard18;
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var code = val.substring(17);
                if(p.test(val)) {
                    var sum = 0;
                    for(var i=0;i<17;i++) {
                        sum += val[i]*factor[i];
                    }
                    if(parity[sum % 11] == code.toUpperCase()) {
                        return true;
                    }
                }
                return false;
            }
            // 整体校验
            if(checkCode(val)) {
                var date = val.substring(6,14);
                if(checkDate(date)) {
                    if(checkProv(val.substring(0,2))) {
                        return true;
                    }
                }
            }
            return false;
        },
    }
    /**************************** 卡片 ****************************/
    let regCard = {// 卡号相关
        idCard (sId) {// 身份证：严格验证
             let aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
             let iSum=0 ;
             let info="" ;
             if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
             sId=sId.replace(/x$/i,"a");
             if(aCity[parseInt(sId.substr(0,2))]==null) return "你输入的的身份证地区有误";
             let sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
             let d=new Date(sBirthday.replace(/-/g,"/")) ;
             if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "你输入的的身份证出生日期有误";
             for(let i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
             if(iSum%11!=1) return "你输入的身份证号有误";
             aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
             return true;
        },
        bankCard (cardNo) {// 银行卡验证
            let tmp=true,total=0;
            for(let i=cardNo.length;i>0;i--){
                let num=cardNo.substring(i,i-1);
                if(tmp=!tmp,tmp)num=num*2;
                let gw=num%10;
                total+=(gw+(num-gw)/10);
            }
            return total%10==0;
        }
    }
    let regCom = {// 公司企业相关
        /** 营业执照
            *验证营业执照是否合法：营业执照长度须为15位数字，前14位为顺序码， 
            *最后一位为根据GB/T 17710 1999(ISO 7064:1993)的混合系统校验位生成算法 
            *计算得出。此方法即是根据此算法来验证最后一位校验位是否政正确。如果 
            *最后一位校验位不正确，则认为此营业执照号不正确(不符合编码规则)。 
            *以下说明来自于网络: 
            *我国现行的营业执照上的注册号都是15位的，不存在13位的，从07年开始国 
            *家进行了全面的注册号升级就全部都是15位的了，如果你看见的是13位的注 
            *册号那肯定是假的。 
            *15位数字的含义，代码结构工商注册号由14位数字本体码和1位数字校验码 
            *组成，其中本体码从左至右依次为：6位首次登记机关码、8位顺序码。　　 
              *   一、前六位代表的是工商行政管理机关的代码，国家工商行政管理总局用 
                  *           “100000”表示，省级、地市级、区县级登记机关代码分别使用6位行 
                  *             政区划代码表示。设立在经济技术开发区、高新技术开发区和保税区 
                  *             的工商行政管理机关（县级或县级以上）或者各类专业分局应由批准 
                  *             设立的上级机关统一赋予工商行政管理机关代码，并报国家工商行政 
                  *             管理总局信息化管理部门备案。 
              *   二、顺序码是7-14位，顺序码指工商行政管理机关在其管辖范围内按照先 
                  *             后次序为申请登记注册的市场主体所分配的顺序号。为了便于管理和 
                  *              赋码，8位顺序码中的第1位（自左至右）采用以下分配规则： 
              *　　          1）内资各类企业使用“0”、“1”、“2”、“3”； 
              *　　          2）外资企业使用“4”、“5”； 
              *　　          3）个体工商户使用“6”、“7”、“8”、“9”。　　 
              *   顺序码是系统根据企业性质情况自动生成的。　　 
              *三、校验码是最后一位，校验码用于检验本体码的正确性 
        */ 
        isValidBusCode(busCode) {// 有误
            var ret=false; 
            if(busCode.length==15){ 
                var sum=0; 
                var s=[]; 
                var p=[]; 
                var a=[]; 
                var m=10; 
                p[0]=m; 
                for(var i=0;i<busCode.length;i++){ 
                    a[i]=parseInt(busCode.substring(i,i+1),m); 
                    s[i]=(p[i]%(m+1))+a[i]; 
                    if(0==s[i]%m){ 
                        p[i+1]=10*2; 
                    }else{ 
                        p[i+1]=(s[i]%m)*2; 
                    }     
                }                                        
                if(1==(s[14]%m)){ //营业执照编号正确! 
                    ret=true; 
                }else{ //营业执照编号错误! 
                    ret=false; 
                } 
            }
            return ret;  
        },
        /** 组织机构代码
            *验证组织机构代码是否合法：组织机构代码为8位数字或者拉丁字母+“-”+1位校验码。 
            *验证最后那位校验码是否与根据公式计算的结果相符。 
            *编码规则请参看 
            *http://wenku.baidu.com/view/d615800216fc700abb68fc35.html 
        */ 
        isValidOrgCode(orgCode) {// 有误
            var ret=false; 
            var codeVal = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]; 
            var intVal =    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]; 
            var crcs =[3,7,9,10,5,8,4,2]; 
            if(!(""==orgCode) && orgCode.length==10){ 
                var sum=0; 
                for(var i=0;i<8;i++){ 
                    var codeI=orgCode.substring(i,i+1); 
                    var valI=-1; 
                    for(var j=0;j<codeVal.length;j++){ 
                        if(codeI==codeVal[j]){ 
                            valI=intVal[j]; 
                            break; 
                        } 
                    } 
                    sum+=valI*crcs[i]; 
                } 
                var crc=11- (sum %  11); 
                switch (crc){ 
                    case 10:{ 
                        crc="X"; 
                        break; 
                    }default:{ 
                        break; 
                    } 
                } 
                if(crc==orgCode.substring(9)){ 
                    ret=true; 
                } 
            }
            return ret;  
        }, 
    }
    /**************************** 计算密码强度 ****************************/
    let passwordScore = (value) => {
        let score = 0;
        if(value.length<=4){
            // console.log(":5 分: 小于等于 4 个字符");
            score += 5;
        }
        if(value.length>=5&&value.length<=7){
            // console.log("10 分:5 到 7 字符");
            score += 10;
        }
        if(value.length>=8&&value.length<=16){
            // console.log(" 25 分: 大于等于 8 个字符");
            score += 25;
        }
        if(value.replace(num.Az,'').length==0){
            // console.log("0 分: 没有字母");
            score += 0;
        }
        if(value.replace(num.az,'').length>0&&value.replace(num.AZ,'').length==0){
            // console.log("10 分: 全都是小写字母");
            score += 10;
        }
        if(value.replace(num.az,'').length==0&&value.replace(num.AZ,'').length>0){
            // console.log("10 分: 全都是大写字母");
            score += 10;
        }
        if(value.replace(num.az,'').length>0&&value.replace(num.AZ,'').length>0){
            // console.log("20 分: 大小写混合字母");
            score += 20;
        }
        if(value.replace(num.num,'').length==0){
            // console.log("0分: 没有数字");
            score += 0;
        }
        if(value.replace(num.num,'').length==1){
            // console.log("10分: 1 个数字");
            score += 10;
        }
        if(value.replace(num.num,'').length>=3){
            // console.log("20分: 大于等于 3个数字");
            score += 20;
        }
        if(value.replace(num.enCode,'').length==0){
            // console.log("0分: 没有符号");
            score += 0;
        }
        if(value.replace(num.enCode,'').length==1){
            // console.log("10分: 1个符号");
            score += 10;
        }
        if(value.replace(num.enCode,'').length>1){
            // console.log("25分: 大于1个符号");
            score += 25;
        }
        if(value.replace(num.Az,'').length>0&&value.replace(num.num,'').length>0){
            // console.log("2分: 字母和数字");
            score += 2;
        }
        if(value.replace(num.Az,'').length>0&&value.replace(num.num,'').length>0&&value.replace(num.enCode,'').length>0){
            // console.log("3分: 字母、数字和符号");
            score += 3;
        }
        if(value.replace(num.AZ,'').length>0&&value.replace(num.az,'').length>0&&value.replace(num.num,'').length>0&&value.replace(num.enCode,'').length>0){
            // console.log("5分: 大小写字母、数字和符号");
            score += 5;
        }
        return score;
    }
module.exports = {
    rep,reg,regNot,regFn,regCard,regCom,passwordScore
}