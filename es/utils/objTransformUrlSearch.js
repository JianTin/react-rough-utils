export default function objTransformUrlSearch(obj) {
  return Object.keys(obj).reduce(function (prev, key) {
    prev += "&" + key + "=" + obj[key];
    return prev;
  }, '').replace(/&/, '?');
}