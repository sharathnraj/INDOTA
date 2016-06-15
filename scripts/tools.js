/**
 * orderBy
 *
 * Hexo doesn't let us sort an array of object by value
 * chaining array.sort(orderBy(key)) didn't work well
 *
 * @param  {array} list to sort
 * @param  {string} property so order by
 * @return {array} sorted list
 */
hexo.extend.helper.register('orderBy', function(array, key) {
  var sortedArray = array.sort(function(a, b) {
    if (a[key] > b[key]) {
      return 1;
    }

    if (a[key] < b[key]) {
      return -1;
    }

    return 0;
  });

  return sortedArray;
});

/**
 * toBinary
 *
 * To convert a decimal number to a unsigned 8/16 bit binary number
 *
 * @param  {number} to be converted
 * @return {number} binary format
 */
hexo.extend.helper.register('toBinary', function(num, length) {
  var sign = (num < 0 ? "-" : "");
  var result = Math.abs(num).toString(2);
  while(result.length < length) {
      result = "0" + result;
  }
  return sign + result;
});

/**
 * formatString
 *
 * First value is the base string to format, additional args are the
 * values to replace "{0}" with.
 *
 * eg: formatString('Why study {0} at ACU', page.title)
 * gives 'Why study Health at ACU' for the health page.
 *
 * @param  {string} (multiple args) of strings to format
 * @return {string}
 */
hexo.extend.helper.register('formatString', function () {
    var s = arguments[0];

    if (s == null || s == '') return s;

    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
});

/**
 * toCamelCase
 *
 * Used to convert module label into ID to create the page navigation
 * If there is no label provided, it'll use the ID instead
 *
 * eg: toCamelCase('Wha to expect')
 * gives 'whatToExpect.
 *
 * @param  {string} (multiple args) of strings to format
 * @return {string}
 */
hexo.extend.helper.register('toCamelCase', function(label, id) {
  var str = label || id;

  return str
      .replace(/[^a-zA-Z]/g, "")
      .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
      .replace(/\s/g, '')
      .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
});