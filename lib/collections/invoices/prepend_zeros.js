// Prepend zeros
function prependZeros(maxLen, num, recordName) {
  var mcr = '';

  if (!num) {
    for (i = 0; i < maxLen; i++) {
      mcr += '0';
    }
  } else {

    var numString = num.toString();

    for (i = 0; i < maxLen - numString.length; i++) {
      mcr += '0';
    }
    mcr += numString;
  }
  if (mcr.length > maxLen) { return '\n' + recordName + ' String is too long!\n' + 'maxlength of ' + recordName + ' is ' + maxLen + ' but actual length of ' + mcr + ' is ' + mcr.length + ' _end_message'; }
  console.log('length of ' + recordName + ' is ' + mcr.length);
  return mcr;
}
