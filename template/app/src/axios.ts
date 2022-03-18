import mobileLog from 'mx-general.macros/dist/log-sync.macro';
import axios from 'axios';
import _ from 'underscore';
import {Notify} from 'vant';

const TIME_OUT = 999999;
const instance = axios.create({
    baseURL: '',
    timeout: TIME_OUT
});

function install(Vue: Vue.VueConstructor): void{
    _.extendOwn(Vue.prototype, {
        $axios: instance
    });
}
instance.interceptors.request.use(config => {
    if (config.data instanceof URLSearchParams) {
        _.extendOwn(config.headers, {'Content-Type': 'application/x-www-form-urlencoded'});
        _.extendOwn(config, {data: config.data.toString()});
    } else if (!(config.data instanceof FormData)) {
        _.defaults(config.headers, {
            'Content-Type': 'application/json;charset=UTF-8'
        });
    }
    return config;
}, error => Promise.reject(error));
instance.interceptors.response.use(response => {
    const {code, message, responseCode, msg, data} = response.data || {};
    if (code != null && String(code) !== '0' && String(code) !== '200' ||
        responseCode != null && String(responseCode) !== '80000') {
        const errMsg = message || msg;
        Notify({
            duration: 0,
            type: 'danger',
            onClick: () => Notify.clear(),
            message: errMsg ? errMsg.replace(/\s+/gu, '&nbsp;') : '没有错误描述'
        });
        mobileLog.error('Axios 拦截到后端异常响应', response.config.method, response.config.url, response);
        return Promise.reject(response);
    }
    if (data == null && /^get$/ui.test(response.config.method || '') &&
        !Array.isArray(response.data) && typeof response.data === 'object') {
        Notify({
            duration: 0,
            type: 'danger',
            onClick: () => Notify.clear(),
            message: `${response.config.method}-${response.config.url} 没有返回 data`
        });
        mobileLog.error(`Axios 拦截到后端异常响应 ${response.config.method}-${response.config.url} 没有返回 data`);
        return Promise.reject(response);
    }
    return response;
}, error => {
    let msg; // = ['抱歉', '服务器有点累,请您稍后重试']
    // 响应状态码
    if (error.response) {
        switch (error.response.status) {
        case 400:
            msg = '请尝试刷新浏览器或者返回用户首页';
            break;
        case 401:
            msg = '您未获得操作此类资源的授权';
            break;
        case 404:
            msg = '您访问的某些资源不存在或者已经被移除';
            break;
        case 502:
            msg = '服务器有点累,请您稍后重试';
            break;
        default:
            msg = /* error.response.data?.errors?.message ||  */error.response.statusText;
            break;
        // no default
        }
    } else {
        switch (error.code) {
        case 'ECONNABORTED':
            msg = `连接超时，超过了 ${TIME_OUT / 1000} 秒`;
            break;
        default:
            msg = `请尝试刷新浏览器或者返回用户首页（${error.message}）`;
            break;
        }
    }
    mobileLog.error('axios - error', error);
    return Promise.reject(msg);
});

export {
    instance as axios,
    install as default
};
