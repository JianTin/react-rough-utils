export default function scrollToId(hash: string){
    document.getElementById(hash.replace('#', ''))?.scrollIntoView()
}