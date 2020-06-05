import axios from 'axios';
import { Toast } from 'vant';
import tool from '@/assets/js/tool';

// const errCodeDec: any = {
//   6000: '请先进行实名登记',
//   5000: '系统异常',
//   2000: '参数校验未通过',
//   10000: '积分不足',
//   10002: '实名过程验证码不正确',
//   10005: '发送短信太频繁',
//   10006: '操作过于频繁'
// };
const errorHandle = (status: any, response: any) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      // 跳转登录页
      // 携带当前页面路由，以期在登录页面完成登录后返回当前页面
      window.sessionStorage.removeItem('token');
      tool.toLogin();
      break;
    // 404请求不存在
    case 404:
      Toast('请求的资源不存在');
      break;
    case 400:
      // let msg = errCodeDec[response.statusCodeDes];
      // if (msg) {
      // Toast(msg);
      // }
      Toast(response.statusCodeDes);
      break;
    case 502:
      Toast('服务器开小差啦，请稍后再试~');
      break;
    default:
      // msg = errCodeDec[response.statusCode];
      // if (msg) {
      //   Toast(msg);
      // }
      Toast(response.statusCodeDes);
      console.log(response);
  }
};

// 创建axios实例
const instance = axios.create({ timeout: 1000 * 16 });
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
// 每次请求前，如果存在token则在请求头中携带token
instance.interceptors.request.use(
  // 暂时不需要，发布时测试后打开
  (config: any) => {
    // 不传递默认开启loading
    if (!config.headers.hideloading) {
      Toast.loading({
        forbidClick: true,
        duration: 0
      });
    }
    const token = window.sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (res) => {
    Toast.clear();
    return res.status === 200 ? Promise.resolve(res) : Promise.reject(res);
  },
  // 请求失败
  (error) => {
    Toast.clear();
    const { response } = error;
    if (response) {
      // // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data);
      return Promise.reject(response);
    } else {
      // tip('请求超时，请稍后再试')
      return Promise.reject(error);
    }
  }
);

export default instance;
