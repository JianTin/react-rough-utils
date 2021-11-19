export default function clearUrlSearch(){
    const search = window.location.search
    if(!search) return;
    window.history.replaceState({}, '', window.location.href.replace(search, ''))
}