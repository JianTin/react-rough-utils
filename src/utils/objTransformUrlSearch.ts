export default function objTransformUrlSearch(obj: {[key: string]: string}){
    return Object.keys(obj).reduce<string>((prev, key)=>{
        prev += `&${key}=${obj[key]}`
        return prev
    }, '').replace(/&/, '?')
}