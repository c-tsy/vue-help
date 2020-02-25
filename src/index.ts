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

export function uuid() {
    var s: any = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010 
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01 
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}