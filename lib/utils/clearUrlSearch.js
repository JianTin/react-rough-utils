"use strict";

exports.__esModule = true;
exports["default"] = clearUrlSearch;

function clearUrlSearch() {
  var search = window.location.search;
  if (!search) return;
  window.history.replaceState({}, '', window.location.href.replace(search, ''));
}