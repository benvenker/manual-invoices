Template.invoiceSubmitForm.events({
  'click .add-invoice-line': function(e) {
    e.preventDefault();
      var newRow = $('<tr><td><input type="text" class="store" maxlength=4></td><td><input type="text" class="class"></td><td><input type="text" class="unitCost" maxlength=11></td><td><input type="text" class="lineRetailCost" maxlength=11></td><td><input type="text" class="quantity" value=""></td><td><input type="text" class="style" maxlength=20 value=""></td><td><input type="text" class="sku" value="" maxlength=8></td><td><input type="text" class="description" value="" maxlength=200></td><td><a class="remove-invoice-line button-red tiny"><b>×</b></a></td></tr>');

      $('table.flakes-table').append(newRow);
  },

  'click .add-invoice': function() {
    var form = $('.grid-form');
    var table = $('.flakes-table tbody');

    // Form validation
    if (!(isSelected(Session.get('opco')) &&
      //isSelected(Session.get('vendorName')) &&
      //isSelected(Session.get('vendorNumber')) &&
      //isSelected(Session.get('department')) &&
      //isSelected(Session.get('manufacturer')) &&
      isSelected(Session.get('transactionCode')) &&
      isSelected(Session.get('source'))
      )) {
    } else {


      var transactionCode = TransactionCodes.find({
        transactionCode: parseInt(Session.get('transactionCode')),
        banner: parseInt(Session.get('opco'))
      }).fetch();
      var glAccount = _.pluck(transactionCode, 'account');
      var invoiceAmount = 0;
      var totalQuantity = 0;
      var retailCost = 0;

      var user = Meteor.user();
      // Get the header values
      var invoice = {
        PO: form.find('[name=PO]').val(),
        BOL: form.find('[name=BOL]').val(),
        totalCost: 0,
        totalQuantity: 0,
        OPCO: form.find('[name=OPCOs]').val(),
        department: form.find('[name=departments]').val(),
        manufacturer: form.find('[name=manufacturers]').val(),
        vendorName: form.find('[name=vendorNames]').val(),
        vendorNumber: parseInt(form.find('[name=vendorNumbers]').val()),
        invoiceNumber: form.find('[name=invoiceNumber]').val(),
        // Get the value of the transCode div in the transaction code dropdown
        transactionCode: parseInt(Session.get('transactionCode')),
        source: form.find('[name=sources]').val(),
        invoiceDate: form.find('[name=invoiceDate]').val(),
        headerDescription: form.find('[name=headerDescription]').val(),
        urn: parseInt(form.find('[name=urn]').val()),
        glAccount: parseInt(glAccount[0]), // Since underscore returns an array, get the
                                 // first element, which contains the GL account
        exported: false,

      }

      // If validation passes, insert invoice
      //if (isValidLength(invoice.invoiceNumber, 5)) {
      //  invoice._id = Invoices.insert(invoice);
      //  console.log(invoice._id);
      //} else {
      //  alert('Invoice numbers must be at least 5 characters!');
      //}
      Meteor.call('invoiceInsert', invoice, function(error, result) {
        // Display the error to the user and abort
        if (error)
          return alert(error.reason);

        // show this result but route anyway
        if (result.invoiceExists)
          alert.('This invoice has already been created');

        Router.go('invoicePage', {_id: result._id});
      });



      /************ Get all the invoice lines ***************/

      // Count the invoice lines
      // var invoiceLineNum = InvoiceLines.find({InvoiceId: invoice._id}).count();
      // console.log(invoiceLineNum);

      var invoiceLineNum = InvoiceLines.find({InvoiceNumber: form.find('[name=invoiceNumber]').val()}).count();
      console.log(invoiceLineNum);

      table.find('tr').each(function () {
        // Increment the invoice line number
        invoiceLineNum++;

        var $tds = $(this).find('td input');
        var unitCost = parseFloat(($tds.eq(2).val()));
        var lineRetailCost = parseFloat(($tds.eq(3).val()));
        var quantity = parseInt($tds.eq(4).val());

        var invoiceLine = {
          invoiceId: invoice._id,
          invoiceNumber: invoice.invoiceNumber,
          invoiceLineNumber: invoiceLineNum,
          store: parseInt($tds.eq(0).val()),
          itemClass: $tds.eq(1).val(),
          unitCost: numeral(unitCost).format('00.00'),
          lineRetailCost: numeral(lineRetailCost).format('00.00'),
          quantity: quantity,
          style: $tds.eq(5).val(),
          sku: $tds.eq(6).val(),
          description: $tds.eq(7).val(),
          lineTotal: numeral(unitCost * quantity).format('00.00'),
          submitted: moment(new Date()).format('L'),
        }

        var lineTotalVar = numeral(unitCost * quantity).format('00.00');
        var lineRetailCostVar = numeral(lineRetailCost * quantity).format('00.00');

        invoiceAmount += numeral().unformat(lineTotalVar);
        retailCost += numeral().unformat(lineRetailCostVar);
        totalQuantity += quantity;
        InvoiceLines.insert(invoiceLine);

        // Update variables for header
        var currentInvoice = invoice._id;
        var vendor = Manufacturers.findFaster({
          department: parseInt(invoice.department),
          manufacturer: parseInt(invoice.manufacturer)
        }).fetch();
        // var vendorNumber = _.pluck(vendor, 'supplierSite');
        //
        var invoiceProperties = {
          totalCost: numeral(invoiceAmount).format('00.00'),
          retailCost: numeral(retailCost).format('00.00'),
          totalQuantity: totalQuantity
          // vendorNumber: vendorNumber
        };
        //console.log(invoiceLineNum);
        //
        Invoices.update(currentInvoice, {$set: invoiceProperties})
      });

      Router.go('invoicePage', invoice);
    }
  },

  'click .remove-invoice-line': function(e) {
    e.preventDefault();
    $('.remove-invoice-line').click(function(event) {
      $(this).closest('tr').remove();
    });
  }
});
