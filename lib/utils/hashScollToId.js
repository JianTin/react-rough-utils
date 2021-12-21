"use strict";

exports.__esModule = true;
exports["default"] = hashScollToId;

function hashScollToId() {
  var _document$getElementB;

  var hash = window.location.hash;
  if (!hash) return;
  var id = decodeURI(hash).replace('#', '');
  (_document$getElementB = document.getElementById(id)) == null ? void 0 : _document$getElementB.scrollIntoView();
}