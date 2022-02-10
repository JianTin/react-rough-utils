var notUrlCbArray = ['chrome.google.com', 'chrome://'];

var urlRunExtensions = function urlRunExtensions(extraUrl, cb, windowId) {
  var newArray = notUrlCbArray.concat(extraUrl);

  function retrieveUrl(tabs) {
    if (tabs.length === 1) {
      var url = tabs[0].url;
      var isRun = newArray.find(function (notUrl) {
        return url.includes(notUrl);
      }) ? false : true;
      return cb(isRun);
    }

    return cb(false);
  }

  if (windowId) {
    chrome.tabs.query({
      windowId: windowId,
      active: true
    }, retrieveUrl);
  } else {
    chrome.tabs.query({
      currentWindow: true,
      active: true
    }, retrieveUrl);
  }
};

export default urlRunExtensions;