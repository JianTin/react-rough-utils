import type urlRunExtensions from '../../@types/utils/urlRunExtensions';

const notUrlCbArray = ['chrome.google.com', 'chrome://']
const urlRunExtensions: urlRunExtensions = function urlRunExtensions(extraUrl, cb, windowId){
    const newArray = notUrlCbArray.concat(extraUrl)
    function retrieveUrl(tabs: chrome.tabs.Tab[]){
        if(tabs.length === 1) {
            const {url} = tabs[0]
            const isRun = newArray.find((notUrl)=> (url as string).includes(notUrl)) ? false : true
            return cb(isRun)
        }
        return cb(false)
    }
    if(windowId){
        chrome.tabs.query({windowId, active: true}, retrieveUrl)
    } else {
        chrome.tabs.query({currentWindow: true, active: true}, retrieveUrl)
    }
}

export default urlRunExtensions