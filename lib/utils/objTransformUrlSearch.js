"use strict";

exports.__esModule = true;
exports["default"] = objTransformUrlSearch;

function objTransformUrlSearch(obj) {
  return Object.keys(obj).reduce(function (prev, key) {
    prev += "&" + key + "=" + obj[key];
    return prev;
  }, '').replace(/&/, '?');
}