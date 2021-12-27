import clearUrlHash from "./clearUrlHash";
import clearUrlSearch from './clearUrlSearch'
import hashScrollToId from './hashScrollToId'
import objTransformUrlSearch from './objTransformUrlSearch'
import urlSearchTransformObj from "./urlSearchTransformObj"
import Observer from './observer'

export default interface Utils {
    clearUrlHash: clearUrlHash
    clearUrlSearch: clearUrlSearch
    hashScrollToId: hashScrollToId
    objTransformUrlSearch: objTransformUrlSearch
    urlSearchTransformObj: urlSearchTransformObj
    Observer: Observer
}