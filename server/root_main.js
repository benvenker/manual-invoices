// var fs = Npm.require('fs');
// __ROOT_APP_PATH__ = fs.realpathSync('.');
// console.log(__ROOT_APP_PATH__);
//
//
// /*************************** Helper Functions *******************************/
//
// // Prepend zeros
// function prependZeros(maxLen, num, recordName) {
//   var mcr = '';
//
//   if (!num) {
//     for (i = 0; i < maxLen; i++) {
//       mcr += '0';
//     }
//   } else {
//
//     var numString = num.toString();
//
//     for (i = 0; i < maxLen - numString.length; i++) {
//       mcr += '0';
//     }
//     mcr += numString;
//   }
//   if (mcr.length > maxLen) { return '\n' + recordName + ' String is too long!\n' + 'maxlength of ' + recordName + ' is ' + maxLen + ' but actual length of ' + mcr + ' is ' + mcr.length + ' _end_message'; }
//     console.log('length of ' + recordName + ' is ' + mcr.length);
//     return mcr;
// }
//
// // Append spaces
// function appendSpaces(maxLen, num, recordName) {
//   var mcr = '';
//
//   if (!num) {
//     num = '';
//     for (i = 0; i < maxLen; i++) {
//       mcr += ' ';
//     }
//   } else {
//
//     var numString = num.toString();
//
//     for (i = 0; i < maxLen - numString.length; i++) {
//       mcr += ' ';
//     }
//   }
//   if ((mcr + num).length > maxLen) { return recordName + "String is too long!"; }
//
//   console.log('length of ' + recordName + ' is ' + mcr.length);
//   return num + mcr;
// }
//
// // Checks the sign of the invoice; defualts to '+' if no values passed
// function checkInvoiceSign(invoice, total) {
//   if (!invoice || !total) {
//     return '+';
//   } else {
//     if (total > 0) { return '+'; }
//     if (total < 0) { return '-'; }
//   }
// }
