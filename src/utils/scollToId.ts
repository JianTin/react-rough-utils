export default function scollToId(hash: string){
    document.getElementById(hash.replace('#', ''))?.scrollIntoView()
}