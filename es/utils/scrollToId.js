export default function scrollToId(hash) {
  var _document$getElementB;

  (_document$getElementB = document.getElementById(hash.replace('#', ''))) == null ? void 0 : _document$getElementB.scrollIntoView();
}