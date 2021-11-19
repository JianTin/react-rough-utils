export default function hashScollToId(){
    const hash = window.location.hash
    if(!hash) return;
    const id = decodeURI(hash).replace('#', '')
    document.getElementById(id)?.scrollIntoView()
}