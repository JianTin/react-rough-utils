import clearUrlHash from "./clearUrlHash";
import clearUrlSearch from './clearUrlSearch'
import scrollToId from './scrollToId'
import objTransformUrlSearch from './objTransformUrlSearch'
import urlSearchTransformObj from "./urlSearchTransformObj"
import Observer from './observer'
import urlRunExtensions from './urlRunExtensions'
import transformEhibitPrice from "./transformExhibitPrice";

export default interface Utils {
    clearUrlHash: clearUrlHash
    clearUrlSearch: clearUrlSearch
    scrollToId: scrollToId
    objTransformUrlSearch: objTransformUrlSearch
    urlSearchTransformObj: urlSearchTransformObj
    Observer: Observer
    urlRunExtensions: urlRunExtensions
    transformEhibitPrice: transformEhibitPrice
}