/**
 * 描述：将 1000 -> 1,000.00
 *      100.232323 -> 100.23
 * @param {string} [price] - 传入的金额
 * @return {string} transformPrice - 转换后的金额
*/
// 生成小数
function generateDecimal(decimal: string, num: number){
    let result = decimal
    const decimalLen = decimal.length
    // 小于
    if(decimalLen < num) {
        const gap = num - decimalLen
        let decimalExpand = ''
        for(let i=0; i<gap; i++){
        decimalExpand+='0'
        }
        result += decimalExpand
    } else if(decimalLen > num) { // 大于
        result = decimal.substring(0, num)
    }
    return result
}

export default function transformEhibitPrice(price?: string | number, decimalLength = 2){
    if(!price) return `0.${generateDecimal('', decimalLength)}`
    let str = String(price)
    // 存储处理小数
    let storageDecimal = ''
    // 小数点处理
    if(str.includes('.')) {
        const [integer,decimal]= str.split('.')
        // 保持两位小数
        storageDecimal = decimal
        str = integer
    }
    // 转换
    return Number(str).toLocaleString()+'.'+ generateDecimal(storageDecimal, decimalLength)
}