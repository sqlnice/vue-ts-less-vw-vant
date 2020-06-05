import axios from './axios';
/**
 * 接口域名的管理
 */
const base = process.env.NODE_ENV === 'development' ? `./api` : './api';

export const getToken = (code: string): Promise<any> =>
  axios({
    url: `${base}/account/token?code=${code}`,
    method: `get`,
  });

export const noToast = (code: string): Promise<any> =>
  axios({
    url: `${base}/account/token?code=${code}`,
    method: `get`,
    headers: { // 隐藏Toast
      hideloading: true
    },
  });
