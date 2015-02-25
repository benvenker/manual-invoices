Template.invoiceSubmitForm.rendered = function(){
  // Inject all typeahead instances
  Meteor.typeahead.inject();
};

Template.invoiceSubmitForm.events({
  'keydown [name=vendorNumber]': function(e) {
    console.log('event detected');
    isProvided(e, "[name=vendorNumber]", "Vendor Number");
  },

  'keydown [name=department]': function(e) {
    isProvided(e, "[name=department]", "Department");
  },

  'keydown [name=invoiceNumber]': function(e) {
    isProvided(e, "[name=invoiceNumber]", "Invoice Number");
  },

  'keydown .store': function(e) {
    isProvided(e, ".store", "Store");
  },

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
      isSelected(Session.get('transactionCode')) &&
      isSelected(Session.get('source'))) &&
      //isNotEmpty(Session.get('department'))
      storesEntered()) {
        alert("Please fill out all required fields!");

      } else {

      var transactionCode = TransactionCodes.find({ // Get a TransactionCode object
        transactionCode: parseInt(Session.get('transactionCode')),
        banner: parseInt(Session.get('opco'))
      }).fetch();
      var glAccount = _.pluck(transactionCode, 'account'); // Get the GL account from TransactionCode object
      var invoiceAmount = 0;
      var totalQuantity = 0;
      var retailCost = 0;
      var invoiceDate = moment(form.find('[name=invoiceDate]').val()).format('DDMMYYYY');

      // Get the header values
      var invoice = {
        PO: form.find('[name=PO]').val(),
        BOL: form.find('[name=BOL]').val(),
        totalCost: 0,
        totalQuantity: 0,
        OPCO: form.find('[name=OPCOs]').val(),
        department: form.find('[name=department]').val(),
        vendorName: form.find('[name=vendorName]').val(),
        vendorNumber: form.find('[name=vendorNumber]').val(),
        invoiceNumber: form.find('[name=invoiceNumber]').val(),
        // Get the value of the transCode div in the transaction code dropdown
        transactionCode: parseInt(Session.get('transactionCode')),
        source: form.find('[name=sources]').val(),
        invoiceDate: invoiceDate,
        headerDescription: form.find('[name=headerDescription]').val(),
        urn: form.find('[name=urn]').val(),
        glAccount: glAccount[0], // Since underscore returns an array, get the
                                 // first element, which contains the GL account
        exported: false
      };

      var invoiceLineNum = InvoiceLines.find({InvoiceNumber: form.find('[name=invoiceNumber]').val()}).count();
      console.log(invoiceLineNum);

      /************ Get all the invoice lines ***************/
      var invoiceLinesArr = []
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
        };
        var lineTotalVar = numeral(unitCost * quantity).format('00.00');
        var lineRetailCostVar = numeral(lineRetailCost * quantity).format('00.00');

        // Increment the invoice totals by line total
        invoiceAmount += numeral().unformat(lineTotalVar);
        retailCost += numeral().unformat(lineRetailCostVar);
        totalQuantity += quantity;

        invoiceLinesArr.push(invoiceLine);  // Add invoiceLine object to array
      });

      var invoiceProperties = {
        totalCost: numeral(invoiceAmount).format('00.00'),
        retailCost: numeral(retailCost).format('00.00'),
        totalQuantity: totalQuantity,
        lines: invoiceLinesArr  // Add the invoice lines
      };

      // extend the invoice object
      _.extend(invoice, invoiceProperties);

      Meteor.call('insertInvoice', invoice, function(error, result) {
        if (error)
          return alert(error.reason);

        if (result.invoiceExists)
          alert("This invoice has already been submitted!");

        Router.go('invoicePage', {_id: result._id});
      });
    }
  },

  'click .remove-invoice-line': function(e) {
    e.preventDefault();
    $('.remove-invoice-line').click(function(event) {
      $(this).closest('tr').remove();
    });
  }
});
