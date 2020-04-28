/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-01-20
 * @author Liang <liang@maichong.it>
 */

'use strict';

var numbers = '0123456789';
var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var specials = '~!@#$%^*()_+-=[]{}|;:,./<>?';

/**
 * Generate random string
 * @param {Number} length
 * @param {Object} options
 */
function random(length, options) {
  length || (length = 8);
  options || (options = {});

  var chars = '';
  var result = '';

  if (options === true) {
    chars = numbers + letters + specials;
  } else if (typeof options == 'string') {
    chars = options;
  } else {
    if (options.numbers !== false) {
      chars += (typeof options.numbers == 'string') ? options.numbers : numbers;
    }

    if (options.letters !== false) {
      chars += (typeof options.letters == 'string') ? options.letters : letters;
    }

    if (options.specials) {
      chars += (typeof options.specials == 'string') ? options.specials : specials;
    }
  }

  while (length > 0) {
    length--;
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

module.exports = random.default = random;
