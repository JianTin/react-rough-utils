export default function urlSearchTransformObj(search) {
  var searchObj = {};

  if (typeof search === 'string' && search.length > 0) {
    var searchMarkIndex = search.indexOf('?');

    if (searchMarkIndex === 0) {
      search = search.replace(/\?/, '');
    }

    search.split('&').forEach(function (searchItem) {
      var _searchItem$split = searchItem.split('='),
          key = _searchItem$split[0],
          value = _searchItem$split[1];

      if (key && value) searchObj[key] = value;
    });
  }

  return searchObj;
}