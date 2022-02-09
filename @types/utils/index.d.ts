import clearUrlHash from "./clearUrlHash";
import clearUrlSearch from './clearUrlSearch'
import scollToId from './scollToId'
import objTransformUrlSearch from './objTransformUrlSearch'
import urlSearchTransformObj from "./urlSearchTransformObj"
import Observer from './observer'
import urlRunExtensions from './urlRunExtensions'

export default interface Utils {
    clearUrlHash: clearUrlHash
    clearUrlSearch: clearUrlSearch
    scollToId: scollToId
    objTransformUrlSearch: objTransformUrlSearch
    urlSearchTransformObj: urlSearchTransformObj
    Observer: Observer
    urlRunExtensions: urlRunExtensions
}