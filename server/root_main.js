var fs = Npm.require('fs');
__ROOT_APP_PATH__ = fs.realpathSync('.');
console.log(__ROOT_APP_PATH__);

/***************************** Variables ************************************/
var ciu_mcr, ciu_header, ciu_detail;

/*************************** Helper Functions *******************************/

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
  if (mcr + num > maxLen) { return recordName + "String is too long!"; }

  console.log('length of ' + recordName + ' is ' + mcr.length);
  return num + mcr;
}

// Checks the sign of the invoice; defualts to '+' if no values passed
function checkInvoiceSign(invoice, total) {
  if (!invoice || !total) {
    return '+';
  } else {
    if (total > 0) { return '+'; }
    if (total < 0) { return '-'; }
  }
}
/*********************** CIU MCR ************************/

// #1 MCR record
var mcr1 = "MCR";

// #2 Batch Number
var batchNumber = "BBB";
var interfaceNumber = "AP208";
var newDate = moment().format('MMDDYYYYHHMMSS');

var mcr2 = batchNumber + interfaceNumber + newDate;

// #3 Total number of header lines - should always be one for this app.
// Can be re-written as a function later if we need to do bulk uploads.
var mcr3 = prependZeros(15, 1, 'mcr3');

// #4 Total number of invoice detail lines
// Need a function like: InvoiceLines.find({invoiceId: this._id}).count();
// a
var mcr4 = '000000000000000';

// #5 Invoice Amount Position
//  Defaults to 7. This is the field position of the invoice amount in the
//  invoice header record
var mcr5 = prependZeros(2, 7, 'mcr5');

// #6 Total invoice amount sign;
//  '+' or '-'. Blank = '+'
var mcr6 = checkInvoiceSign();

// #7 Total of the Invoice Amount column in header record - includes decimal
// point!
// TODO: need a function here, or something like:
//  mcr7 = prependZeros(11, this.invoiceAmount*100);
var mcr7 = prependZeros(11,'invLineAmt','mcr7');


// #8 Source
// i.e. from Invoice Submission form dropdown: SAKS ME MANUAL INVOICES:
//  var mcr8 = this.source;
var mcr8 = prependZeros(30, '', 'mcr8')

var ciu_mcr = mcr1 + mcr2 + mcr3 + mcr4 + mcr5 + mcr6 + mcr7 + mcr8 + '\n';


/***************************** CIU HEADER ****************************/

// #1 just 'HDR'
var hdr1 = "HDR";

// #2 Vendor Number
var hdr2 = prependZeros(10, '', 'hdr2');

// #3 Ivnoice Number
var hdr3 = appendSpaces(25);

// #4 Voucher number - tells what invoice number that is in the batch of
//  invoices. Will always be '1' for this application (for now).
var hdr4 = 'BBBAP208' + moment().format('MMDDYYYYHHMMSS') + '00000001';

// #5 Invoice Date
//  i.e. invoiceDate = this.invoiceDate;
// TODO: need function to get date from current invoice
var hdr5 = moment().format('DDMMYYYY'); // using moment date as placeholer

// #6 Invoice Sign
var hdr6 = checkInvoiceSign();

// #7 Total of the Invoice Amount column in header record - includes decimal
// point!
// TODO: need a function here, or something like:
//  hdr7 = prependZeros(11, this.invoiceAmount*100);
var hdr7 = prependZeros(11,'','hdr7');

// #8 Transaction Code
var hdr8 = prependZeros(3,'','hdr8')

// HDR9 - HDR11 are not required
var hdr9 = appendSpaces(2, '', 'hdr9');
var hdr10 = appendSpaces(3, '', 'hdr10');
var hdr11 = appendSpaces(30, '', 'hdr11')

// #12 Invoice Received date
var hdr12 = moment().format('DDMMYYYY');

// #13 GL_DATE - NOT REQUIRED
var hdr13 = appendSpaces(8, '', 'hdr13');

// #14 Invoice Header Description
// TODO: Write function to get invoice header description from current invoice
var hdr14 = appendSpaces(200, '', 'hdr14');

// HDR15 - HDR28 not required. Including goods received date and URN to mimic
//  what's on sample file
var hdr15_28 = appendSpaces(130, '', 'hdr15_28')

var ciu_hdr = hdr1 + hdr2 + hdr3 + hdr4 + hdr5 + hdr6 + hdr7 + hdr8 + hdr9 +
              hdr10 + hdr11 + hdr12 + hdr13 + hdr14 + hdr15_28 + '\n';


/***************************** DETAIL RECORD *********************************/
// #1 'DDR'
var ddr1 = 'DDR';

// #2 Vendor Number (same as HDR Vendor Number)
var ddr2 = prependZeros(10, '', 'ddr2');

// #3 Invoice number (same as HDR Invoice Number)
var ddr3 = appendSpaces(25,'','ddr3');

// #4 Invoice Distribution Line Amount Sign **** NOT REQUIRED ****
var ddr4 = checkInvoiceSign();

// #5 Invoice Distribution Line Amount
var ddr5 = prependZeros(11,'', 'ddr5');

/********** GL Account ***********/
// Company
var ddr6 = prependZeros(2);
// Operating Unit
var ddr7 = prependZeros(2);
// Location
var ddr8 = prependZeros(4);
// Cost Center
var ddr9 = prependZeros(5);
// Account
var ddr10 = prependZeros(5);
// Department
var ddr11 = prependZeros(4);
// Inter Company
var ddr12 = prependZeros(2);
/**********************************/

// Retail amount sign
var ddr13 = checkInvoiceSign();

// Retail amount
var ddr14 = prependZeros(11,'','ddr14');

// Quantity invoiced sign
var ddr15 = checkInvoiceSign();

// Invoiced Quantity
var ddr16 = prependZeros(11,'','ddr15');

// Unit Cost
var ddr17 = prependZeros(11,'','ddr17');

// Line Description
var ddr18 = appendSpaces('200','','ddr18');

// Last Ship Date
var ddr19 = prependZeros(8,'','ddr19');

// PO#
var ddr20 = appendSpaces(20,'','ddr20');

// PO Cost sign
var ddr21 = checkInvoiceSign();

// PO Cost
var ddr22 = prependZeros(11,'','ddr22');

// Received Quantity sign
var ddr23 = checkInvoiceSign();

// Received Quantity
var ddr24 = prependZeros(11,'','ddr24');


// Start Ship Date
var ddr25 = prependZeros('8','','ddr25');

// Store
var ddr26 = prependZeros('4','','ddr26');

// SKU
var ddr27 = prependZeros('8','', 'ddr27');

// Style
var ddr28 = prependZeros('20','', 'ddr28');

// Class
var ddr29 = prependZeros('4','', 'ddr29');

// Docrec
var ddr30 = prependZeros(7,'','ddr30');

// Ship Date
var ddr31 = prependZeros('8','','ddr31');

// Cancel Date
var ddr32 = prependZeros('8','','ddr32');

var glAccount = ddr6 + ddr7 + ddr8 + ddr9 + ddr10 + ddr11 + ddr12;

var ciu_ddr = ddr1 + ddr2 + ddr3 + ddr4 + ddr5 + glAccount + ddr13 +
              ddr14 + ddr15 + ddr16 + ddr17 + ddr18 + ddr19 + ddr20 +
              ddr21 + ddr22 + ddr23 + ddr24 + ddr25 + ddr26 + ddr27 +
              ddr28 + ddr29 + ddr30 + ddr31 + ddr32 + '\n';

/******************************* EXPORT ******************************/
var ciu_export = ciu_mcr + ciu_hdr + ciu_ddr + 'EOF';


fs.writeFile('/Users/Ben/Desktop/ciu_test.dat1', ciu_export, function(err) {
  if (err) throw err;
  console.log('It\'s saved');
  console.log(mcr2);
});
