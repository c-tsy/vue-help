import * as moment from 'moment'
import { get } from 'lodash'
declare let window: any;
function install(Vue) {
    let filters = {
        age, date, get, money, ago, preview
    }
    if (Vue.version.indexOf('2.') == 0) {
        for (let k in filters) {
            Vue.filter(k, filters[k])
        }
    } else {
        // debugger
        // Vue.config.globalProperties.$filter = filters
    }
}
export default {
    install, inject
}

const Config = {
    store: {},
    router: {}
}
/**
 * 注入vuex和router
 * @param store vuex
 * @param router vue-router
 */
export function inject(store: any, router: any) {
    Config.store = store;
    Config.router = router;
}
/**
 * 缓存读取
 * 需要定义Store上的全局Cache的State
 * @param key 
 */
export function cache(k: string, key: string, def = '') {
    return get(Config.store, `state.Cache[${k}][${key}]`, def)
}
/**
 * 图片预览
 * @param urls 
 * @param i 
 */
export function preview(urls: string | string[], i = 0) {
    if (window.vant) {
        window.vant.ImagePreview({ images: urls instanceof Array ? urls : [urls], startPosition: i, closeable: true, })
    } else {
        console.error('缺少Vant环境，暂不支持预览')
    }
}
/**
 * 多少时间之前
 */
export function ago(time: Date | string = new Date) {
    return moment(time).fromNow()
}
/**
 * 求年龄
 * @param value 
 */
export function age(value: string | Date) {
    //出生时间 毫秒
    let BirthDayTime = new Date(value).getTime()
    //当前时间 毫秒
    let NowTime = new Date().getTime()
    //一年毫秒数(365 * 86400000 = 31536000000)
    return Math.ceil((NowTime - BirthDayTime) / 31536000000)
}
/**
 * 
 * @param val 
 * @returns 
 */
export function money(val: number | string) {
    return Number(val).toFixed(2)
}
/**
 * 可靠的读取某个值
 * @param d 
 * @param key 
 * @param def 
 * @returns 
 */
export function get(d: Object, key: string, def: any) {
    return get(d, key, def)
}
/**
 * 时间处理
 * @param time  时间
 * @param format 时间格式
 */
export function date(time: Date | string = new Date, format: string = "YYYY-MM-DD HH:mm") {
    if (time && time.toString().toLowerCase() != 'invalid date') {
        return moment(time).format(format)
    }
    return "";
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}