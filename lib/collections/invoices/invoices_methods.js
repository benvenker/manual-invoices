fs = Meteor.npmRequire('fs');

Meteor.methods({
  ciuExport: function(invoice) {
    __ROOT_APP_PATH__ = fs.realpathSync('.');
    var exportDir = '/mnt/ManualEntry/TEST/';
    //var exportDir = '/Users/Ben/Desktop/'
    // console.log(__ROOT_APP_PATH__);

    /*************************** Helper Functions *******************************/

    /*
    Get the invoice lines for a given invoice
    */
    function getInvoiceLines(invoice_number) {
      var lines = InvoiceLines.find({invoiceNumber:invoice_number});
      return lines;
    }

    /*
    Calculate the total cost of an invoice by summming the lineTotal of
    each invoice line
    */
    function TotalCost(invoice_number) {
      var lines = getInvoiceLines(invoice_number).fetch();
      var lineValues = _.pluck(lines, 'lineTotal');

      // Convert line values to numbers
      lines = _.map(lineValues, function (line) {
        return parseFloat(line);
      });
      // Sum the array of values
      var totalCost = lines.reduce(function (previousValue, currentValue) {
        return currentValue + previousValue;
      });
      return totalCost * 100; // Get rid of the decimal points
    };
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
      else
        //console.log('length of ' + recordName + ' is ' + mcr.length);
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
        if ((mcr + num).length > maxLen) { return recordName + "String is too long!"; }

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

      /***************************** Variables **********************************/
      // var invoice = "QNcZEabbNQoWBN8eS";

      var exportInvoice = Invoices.find({_id: invoice}).fetch();
      var invoiceId = _.pluck(exportInvoice, '_id').toString();
      var invoiceNumber = _.pluck(exportInvoice, 'invoiceNumber');
      var vendorNumber = _.pluck(exportInvoice, 'vendorNumber');
      // var invoice_num = invoice_num.toString();
      var invoiceAmount = _.pluck(exportInvoice, 'totalCost')*100;
      var source = _.pluck(exportInvoice, 'source');
      var countDetailLines = InvoiceLines.find({invoiceId: invoiceId}).count();
      var invoiceDate = _.pluck(exportInvoice, 'invoiceDate');
      var headerDescription = _.pluck(exportInvoice, 'description');
      var glAccount = _.pluck(exportInvoice, 'glAccount').toString();
      var PO = _.pluck(exportInvoice, 'PO')


      /*********************** CIU MCR ************************/

      // #1 MCR record
      var mcr1 = "MCR";

      // #2 Batch Number
      var batchNumber = "BBB";
      var interfaceNumber = "AP208";
      var newDate = moment().format('MMDDYYYYHHMMSS');
      var fileNameDate = moment().format('YYMMDDHHMMSSSSS')
      // Get the current date for CIU file name
      var currDate = newDate;

      var mcr2 = batchNumber + interfaceNumber + currDate;

      // #3 Total number of header lines - should always be one for this app.
      // Can be re-written as a function later if we need to do bulk uploads.
      var mcr3 = prependZeros(15, 1, 'total header lines');

      // #4 Total number of invoice detail lines
      // Need a function like: InvoiceLines.find({invoiceId: this._id}).count();
      // a
      var mcr4 = prependZeros(15, countDetailLines, 'total detail lines');

      // #5 Invoice Amount Position
      //  Defaults to 7. This is the field position of the invoice amount in the
      //  invoice header record
      var mcr5 = prependZeros(2, 7, 'invoice amount position');

      // #6 Total invoice amount sign;
      //  '+' or '-'. Blank = '+'
      var mcr6 = checkInvoiceSign();

      // #7 Total of the Invoice Amount column in header record - includes decimal
      // point!
      // TODO: need a function here, or something like:
      //  mcr7 = prependZeros(11, this.invoiceAmount*100);
      var mcr7 = prependZeros(11, invoiceAmount, 'total invoice amount');


      // #8 Source
      // i.e. from Invoice Submission form dropdown: SAKS ME MANUAL INVOICES:
      //  var mcr8 = this.source;
      var mcr8 = appendSpaces(30, source, 'source');

      var ciu_mcr = mcr1 + mcr2 + mcr3 + mcr4 + mcr5 + mcr6 + mcr7 + mcr8 + '\n';


      /***************************** CIU HEADER ****************************/

      // #1 just 'HDR'
      var hdr1 = "HDR";

      // #2 Vendor Number
      var hdr2 = prependZeros(10, vendorNumber,'vendor number');

      // #3 Invoice Number
      var hdr3 = appendSpaces(25, invoiceNumber,'invoice number');

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
      var hdr7 = prependZeros(11, invoiceAmount, 'total invoice amount');

      // #8 Transaction Code
      var hdr8 = prependZeros(3,'110', 'transaction code');

      // HDR9 - HDR11 are not required
      var hdr9 = appendSpaces(2, '');
      var hdr10 = appendSpaces(3, '');
      var hdr11 = appendSpaces(30, '');

      // #12 Invoice Received date
      var hdr12 = invoiceDate;

      // #13 GL_DATE - NOT REQUIRED, LEAVE BLANK
      var hdr13 = appendSpaces(8, '')// moment().format('DDMMYYYY');

      // #14 Invoice Header Description
      var hdr14 = appendSpaces(200, headerDescription,'header description');

      // HDR15 - HDR28 not required. Including goods received date and URN to mimic
      //  what's on sample file
      // TODO: create variables for at least some of hdr15 - hdr28
      var hdr15_28 = appendSpaces(130, '');

      var ciu_hdr = hdr1 + hdr2 + hdr3 + hdr4 + hdr5 + hdr6 + hdr7 + hdr8 + hdr9 +
      hdr10 + hdr11 + hdr12 + hdr13 + hdr14 + hdr15_28 + '\n';

      // Write the MCR and HDR records to the file
      var ciuFile = exportDir + interfaceNumber + fileNameDate + '.dat';
      fs.writeFileSync(ciuFile, ciu_mcr + ciu_hdr);

      /***************************** DETAIL RECORD *********************************/
      // find all the invoice lines for an invoiceId
      console.log("Starting the invocie line loop!")
      var invoiceLines = InvoiceLines.find({invoiceId: invoiceId}).fetch();

      for (k = 0; k < invoiceLines.length; k++) {
        // do some stuff to each invoice line
        var invoiceLineNumber = invoiceLines[k].invoiceLineNumber;
        var lineTotal = invoiceLines[k].lineTotal;
        var quantity = invoiceLines[k].quantity;
        var unitCost = invoiceLines[k].unitCost;
        var lineDescription = invoiceLines[k].description;

        // // #1 'DDR'
        var ddr1 = 'DDR';
        //
        // // #2 Vendor Number (same as HDR Vendor Number)
        var ddr2 = hdr2;
        //
        // // #3 Invoice number (same as HDR Invoice Number)
        var ddr3 = hdr3;
        //
        // // #4 Invoice Distribution Line Amount Sign **** NOT REQUIRED ****
        var ddr4 = checkInvoiceSign();
        //
        // // #5 Invoice Distribution Line Amount
        var ddr5 = prependZeros(11, lineTotal*100);

        /************* GL Account ************/
        var glAccount = glAccount;

        // Retail amount sign
        var ddr13 = checkInvoiceSign();

        // Retail amount
        var ddr14 = prependZeros(11,'','Retail amount');

        // Quantity invoiced sign
        var ddr15 = checkInvoiceSign();

        // Invoiced Quantity
        var ddr16 = prependZeros(11, quantity.toString(), 'invoiced quantity');

        // Unit Cost TODO: fix this at some point, but not required for production.
        var ddr17 = prependZeros(11, '', 'unit cost');

        // Line Description
        var ddr18 = appendSpaces('200', lineDescription, 'line description');

        // Last Ship Date
        var ddr19 = prependZeros(8,'','last ship date');

        // PO#
        var ddr20 = appendSpaces(20, '', 'PO');

        // PO Cost sign
        var ddr21 = checkInvoiceSign();

        // PO Cost
        var ddr22 = prependZeros(11,'', 'PO Cost');

        // Received Quantity sign
        var ddr23 = checkInvoiceSign();

        // Received Quantity
        var ddr24 = prependZeros(11,'', 'received quantity');

        // Start Ship Date
        var ddr25 = prependZeros('8','', 'start ship date');

        // Store
        var ddr26 = prependZeros('4','', 'store');

        // SKU
        var ddr27 = prependZeros('8','', 'sku');

        // Style
        var ddr28 = prependZeros('20','', 'style');

        // Class
        var ddr29 = prependZeros('4','', 'class');

        // Docrec
        var ddr30 = prependZeros(7,'','docrec');

        // Ship Date
        var ddr31 = prependZeros('8','','ship date');

        // Cancel Date
        var ddr32 = prependZeros('8','','cancel date');

        //var glAccount = ddr6 + ddr7 + ddr8 + ddr9 + ddr10 + ddr11 + ddr12;

        var ciu_ddr = ddr1 + ddr2 + ddr3 + ddr4 + ddr5 + glAccount + ddr13 +
        ddr14 + ddr15 + ddr16 + ddr17 + ddr18 + ddr19 + ddr20 +
        ddr21 + ddr22 + ddr23 + ddr24 + ddr25 + ddr26 + ddr27 +
        ddr28 + ddr29 + ddr30 + ddr31 + ddr32 + '\n';

        /******************************* EXPORT ******************************/
        // var ciu_export = ciu_mcr + ciu_hdr + ciu_ddr + ;

        fs.appendFileSync(ciuFile, ciu_ddr);
      }
      fs.appendFileSync(ciuFile, 'EOF');
    }

  });
