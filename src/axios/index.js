import axios from 'axios';
import { Modal } from 'antd';

export default class Axios {

  // Promis封装是面试可定会问到的
  // 回答: Promise里面会接收一个回调函数, 里面有2个参数 resolve 和 reject, 成功时和失败时返回
  static ajax(options) {
    let baseApi = 'http://mock.studyinghome.com/mock/5e84c254b7c2346b3c48c1c3';
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then((response) => {
        if (response.status == '200') {
          let res = response.data;
          if (res.code == '0') {
            resolve(res);
          } else {
            Modal.info({
              title: '提示',
              content: res.msg
            });
          }
        } else {
          reject(response.data);
        }
      });
    });
  }
}
