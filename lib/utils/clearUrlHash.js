"use strict";

exports.__esModule = true;
exports["default"] = cleanUrlHash;

function cleanUrlHash() {
  var hash = window.location.hash;
  if (!hash) return;
  window.history.replaceState({}, '', window.location.href.replace(hash, ''));
}