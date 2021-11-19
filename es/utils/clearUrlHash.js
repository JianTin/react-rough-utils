export default function cleanUrlHash() {
  var hash = window.location.hash;
  if (!hash) return;
  window.history.replaceState({}, '', window.location.href.replace(hash, ''));
}