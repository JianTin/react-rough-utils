"use strict";

exports.__esModule = true;
exports["default"] = scrollToId;

function scrollToId(hash) {
  var _document$getElementB;

  (_document$getElementB = document.getElementById(hash.replace('#', ''))) == null ? void 0 : _document$getElementB.scrollIntoView();
}