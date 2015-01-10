// Append spaces
function appendSpaces(maxLen, num, recordName) {
  var mcr = '';

  if (!num) {
    num = '';
    for (i = 0; i < maxLen; i++) {
      mcr += ' ';
    }
  } else {
    var numString = num.toString();

    for (i = 0; i < maxLen - numString.length; i++) {
      mcr += ' ';
    }
  }
  if ((mcr + num).length > maxLen) { return recordName + "String is too long!"; }

  console.log('length of ' + recordName + ' is ' + mcr.length);
  return num + mcr;
}
