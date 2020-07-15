import { Toast } from "vant";
import router from '@/router';
const tool = {
  // 跳转登录页
  // 携带当前页面路由，以期在登录页面完成登录后返回当前页面
  toLogin() {
    // 获取当前路径
    const r: any = router;
    const curPath: string = r.history.pending ?
      r.history.pending.fullPath.slice(1) :
      r.history.current.fullPath.slice(1);
    const href = process.env.NODE_ENV === 'development' ?
      'http://192.168.8.245:11942/api/Account/login?redirectUrl=' + curPath :
      '/api/Account/login?redirectUrl=' + escape(curPath);
    window.location.replace(href);
  },
  // 距离目前多久时间
  handleTime(t: any) {
    const addTime: number = new Date(t).getTime();
    const nowTime: number = new Date().getTime();
    const difTime: number = nowTime - addTime; // 相差时间
    const minute: number = 1000 * 60;
    const hour: number = minute * 60;
    const day: number = hour * 24;
    const week: number = day * 7;
    const month: number = day * 30;
    const year: number = month * 12;
    let result: string = "";
    if (difTime < 0) {
      console.log("发布时间早于当前时间！");
    } else if (difTime / year >= 1) {
      result = Math.floor(difTime / year) + "年前";
    } else if (difTime / month >= 1) {
      result = Math.floor(difTime / month) + "月前";
    } else if (difTime / week >= 1) {
      result = Math.floor(difTime / week) + "周前";
    } else if (difTime / day >= 1) {
      result = Math.floor(difTime / day) + "天前";
    } else if (difTime / hour >= 1) {
      result = Math.floor(difTime / hour) + "小时前";
    } else if (difTime / minute >= 1) {
      result = Math.floor(difTime / minute) + "分钟前";
    } else {
      result = "刚刚";
    }
    return result;
  },
  // 严格的身份证校验
  isCardID(sId: any) {
    sId = sId || '';
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
      Toast('你输入的身份证长度或格式错误');
      return false;
    }
    // 城市
    const aCity: any = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
    const a: any = parseInt(sId.substr(0, 2), 10);
    if (!aCity[a]) {
      Toast('你的身份证地区非法');
      return false;
    }

    // 出生日期
    const sBirthday = (sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2))).replace(/-/g, "/");
    const d = new Date(sBirthday);
    if (sBirthday !== (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
      Toast('身份证上的出生日期非法');
      return false;
    }

    // 号码
    let sum = 0;
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const codes = "10X98765432";
    for (let i = 0; i < sId.length - 1; i++) {
      sum += sId[i] * weights[i];
    }
    const last = codes[sum % 11]; // 计算出来的最后一位身份证号码
    if (sId[sId.length - 1] !== last) {
      Toast('你输入的身份证号非法');
      return false;
    }

    return true;
  },
  // 港澳通行证
  checkHkongMacao(value: any) {
    value = value || '';
    const tel = /^[HMhm]{1}([0-9]{8})$/;
    if (tel.test(value)) {
      return true;
    } else {
      return false;
    }
  },
  // 护照规则，5-17位，由数字和字母组成，可以全是字母
  checkPassport(value: any) {
    value = value || '';
    const tel2 = /^[a-zA-Z]{5,17}$/;
    const tel = /^[a-zA-Z0-9]{5,17}$/;
    if ((tel.test(value)) || tel2.test(value)) {
      return true;
    } else {
      return false;
    }
  },
  // 台胞证
  checkTaiwCont(value: any) {
    value = value || '';
    const tel1 = /^[0-9]{8}$/;
    if (tel1.test(value)) {
      return true;
    } else {
      return false;
    }
  },
  // 所有证件严格校验
  idCardNo(value: any) {
    value = value || '';
    if (this.isCardID(value) || this.checkHkongMacao(value) || this.checkPassport(value) || this.checkTaiwCont(value)) {
      Toast('证件通过');
      return true;
    } else {
      Toast('请输入正确的考生证件号码');
      return false;
    }
  },
  // 证件有值校验
  idCardNo2(value: any) {
    value = value || '';
    if (value.length > 0) {
      return true;
    } else {
      Toast('请输入正确的证件号码');
      return false;
    }
  },
  // 手机号校验
  isPhone(phone: any) {
    phone = phone || '';
    if (/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(phone)) {
      return true;
    } else {
      Toast('请输入正确的手机号码');
      return false;
    }
  },
  // 验证码校验
  isCode(value: any) {
    value = value || '';
    if (value.length > 0) {
      return true;
    } else {
      Toast('请输入验证码');
      return false;
    }
  },
  // 姓名校验
  isName(value: any) {
    value = value || '';
    if (value.length > 0) {
      return true;
    } else {
      Toast('请输入姓名');
      return false;
    }
  },
  resizeUrl() {
    // 处理剪切url id
    const url = window.location.href;
    const obj: any = {};
    const reg = /[?&][^?&]+=[^?&]+/g;
    const arr = url.match(reg); // return ["?id=123456","&a=b"]
    if (arr) {
      arr.forEach((item) => {
        const tempArr = item.substring(1).split("=");
        const key = tempArr[0];
        const val = tempArr[1];
        obj[key] = decodeURIComponent(val);
      });
    }
    return obj;
  },
  // 货币处理1
  currency(value: any, decimals: number) {
    /**
    * value  金额
    * currency 货币符号
    * decimals  保留位数
    */
    const digitsRE = /(\d{3})(?=\d)/g;
    value = parseFloat(value);
    if (!isFinite(value) || (!value && value !== 0)) return value;
    // currency = currency != null ? currency : '$'
    decimals = decimals != null ? decimals : 0;
    var stringified = Math.abs(value).toFixed(decimals);
    var _int = decimals
      ? stringified.slice(0, -1 - decimals)
      : stringified;
    var i = _int.length % 3;
    var head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) : '';
    var _float = decimals ? stringified.slice(-1 - decimals) : '';
    var sign = value < 0 ? '-' : '';
    return sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
  },
  // 货币处理2
  currency2(value: any) {
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
};
export default tool;
