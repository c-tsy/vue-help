import Vue from 'vue'
import * as moment from 'moment'

Vue.filter('date', date);

Vue.filter('money', (value: string | number) => {
    return Number(value).toFixed(2)
})

Vue.filter('age', age)
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