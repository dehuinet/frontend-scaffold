import mobileLog from 'mx-general.macros/dist/log-sync.macro';
import MobileUtilsBuilder, {waitUtilDeviceReady} from 'mx-app-infrastructure';
import {AjaxExtraConfig, AjaxQuery, AjaxRes} from 'mx-app-infrastructure/types/ajax.d';
import {Route} from 'vue-router';
import _ from 'underscore';
import qs from 'qs';
// -----------------------------------------------
export {isInPhone, isInPC, waitUtilDeviceReady} from 'mx-app-infrastructure';
export const mobileUtils = MobileUtilsBuilder({
    verboseLogs: false,
    baseURL: '',
    log2file: false,
    mockDataEnabled: false,
    nodeEnv: process.env.NODE_ENV,
    forceVconsole: false,
    vconsoleGestureSwitch: false,
    checkEmptyAjaxRes: true
});
export const timeKeyGen = mobileUtils.timeKeyGen.bind(mobileUtils);
export const ajaxGet = <T>(url: string, query?: AjaxQuery, config?: AjaxExtraConfig): Promise<AjaxRes<T>> => mobileUtils.ajaxGet<T>(url, query, config);
export const ajaxPost = <T>(url: string, data: AjaxQuery, config?: AjaxExtraConfig): Promise<AjaxRes<T>> => mobileUtils.ajaxPost<T>(url, data, config);
export const ajaxPut = <T>(url: string, data: AjaxQuery, config?: AjaxExtraConfig): Promise<AjaxRes<T>> => mobileUtils.ajaxPut<T>(url, data, config);
export const ajaxDelete = <T>(url: string, query: AjaxQuery, config?: AjaxExtraConfig): Promise<AjaxRes<T>> => mobileUtils.ajaxDelete<T>(url, query, config);
export const mxApis = mobileUtils;
// -----------------------------------------------
export function fetchQueryParams(route: Route): Dictionary{
    const query = {};
    if (location.search) {
        _.extendOwn(query, qs.parse(location.search.substring(1)));
    }
    _.extendOwn(query, route.query);
    mobileLog.log('合并 location.search 与 vue-router 全部查询参数', query);
    return query;
}
// -----------------------------------------------
type PageVisibleState = 'hidden' | 'shown';
type PageVisibleEventSource = 'pagVisible' | 'cordova' | 'requestAnimationFrame';
type PageVisibleCallback = (type: PageVisibleState, source: PageVisibleEventSource) => void;
export function onPageVisible(callback: PageVisibleCallback): () => void{
    let index = 1;
    let hidden: 'hidden' | 'msHidden' | 'webkitHidden';
    let visibilityChange = '';
    let index1 = 1;
    let onChangeHandle1: () => void;
    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
    }
    if (visibilityChange === '') {
        mobileLog.warn('当前 webview 版本太低不支持【Page Visibility API】');
    } else {
        onChangeHandle1 = (): void => {
            index1++;
            if (index1 > index) {
                index = index1;
                if (document[hidden]) {
                    return callback('hidden', 'pagVisible');
                }
                return callback('shown', 'pagVisible');
            }
            index1 = index;
            return undefined;
        };
        document.addEventListener(visibilityChange, onChangeHandle1, false);
    }
    let index2 = 1;
    let onChangeHandle2: () => void;
    waitUtilDeviceReady.then(() => {
        onChangeHandle2 = (): void => {
            index2++;
            if (index2 > index) {
                index = index2;
                return callback('shown', 'cordova');
            }
            index2 = index;
            return undefined;
        };
        document.addEventListener('resume', onChangeHandle2);
    });
    let aliveFrameId: number, aliveTimerId: NodeJS.Timeout;
    let isAlive = 'shown';
    let stopRequestAnimationFrame = false;
    let index3 = 1;
    const callbackWrapper = (value: PageVisibleState): void => {
        index3++;
        if (index3 > index) {
            index = index3;
            return callback(value, 'requestAnimationFrame');
        }
        index3 = index;
        return undefined;
    };
    const alive = (): void => {
        const isAlive_ = isAlive;
        isAlive = 'shown';
        if (isAlive_ === 'hidden' && isAlive === 'shown') {
            callbackWrapper('shown');
        }
        clearTimeout(aliveTimerId);
        aliveTimerId = setTimeout(() => {
            const isAlive_ = isAlive;
            isAlive = 'hidden';
            if (isAlive_ === 'shown' && isAlive === 'hidden') {
                callbackWrapper('hidden');
            }
        }, 1000);
        if (!stopRequestAnimationFrame) {
            aliveFrameId = requestAnimationFrame(alive);
        }
    };
    aliveFrameId = requestAnimationFrame(alive);
    return (): void => {
        if (onChangeHandle1) {
            document.removeEventListener(visibilityChange, onChangeHandle1);
        }
        if (onChangeHandle2) {
            document.removeEventListener('resume', onChangeHandle2);
        }
        stopRequestAnimationFrame = true;
        cancelAnimationFrame(aliveFrameId);
    };
}
export function getCircularReplacer(){
    const seen = new WeakSet();
    return (key: string, value: unknown): unknown => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return undefined;
            }
            seen.add(value);
        }
        return value;
    };
}
