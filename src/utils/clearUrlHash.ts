export default function cleanUrlHash(){
    const hash = window.location.hash
    if(!hash) return;
    window.history.replaceState({}, '', window.location.href.replace(hash, ''))
}