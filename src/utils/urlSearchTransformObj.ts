export default function urlSearchTransformObj(search: string){
    const searchObj: {[key: string]: string} = {}

    if(typeof search === 'string' && search.length > 0){
        const searchMarkIndex = search.indexOf('?')
        if(searchMarkIndex === 0){
            search = search.replace(/\?/, '')
        }

        search.split('&').forEach((searchItem)=>{
            const [key, value] = searchItem.split('=')
            if(key && value) searchObj[key] = value;
        })
    }
    return searchObj
}