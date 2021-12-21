import clearUrlHash from "./clearUrlHash";
import clearUrlSearch from './clearUrlSearch'
import hashScrollToId from './hashScrollToId'
import objTransformSearch from './objTransformSearch'
import urlSearchTransformObj from "./urlSearchTransformObj"
import Observer from './observer'

export default interface Utils {
    clearUrlHash: clearUrlHash
    clearUrlSearch: clearUrlSearch
    hashScrollToId: hashScrollToId
    objTransformSearch: objTransformSearch
    urlSearchTransformObj: urlSearchTransformObj
    Observer: Observer
}