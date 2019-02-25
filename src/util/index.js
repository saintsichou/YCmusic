//日期生成函数
export function time() { 
    let y = new Date().getFullYear();
    let m = (new Date().getMonth()+1)<10?"0"+(new Date().getMonth()+1):new Date().getMonth()+1;
    let d = new Date().getDate()<10?"0"+new Date().getDate():new Date().getDate();
    let h = new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours();
    let min = new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes();
    let ms = new Date().getSeconds()<10?"0"+new Date().getSeconds():new Date().getSeconds();
    
    let nowTime = `${y}-${m}-${d} ${h}:${min}:${ms}`
    return nowTime;
 }
//带tz 时间转换函数
 export function converTime(t){
    let dateee = new Date(t).toJSON();  
    let date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'') 
    return date;
 }

//搜索防抖函数
 export function debounce (func, delay) {
   let timer
   return function (...args) {
     if (timer) {
       clearTimeout(timer)
     }
     timer = setTimeout(() => {
       func.apply(this, args)
     }, delay)
   }
 }