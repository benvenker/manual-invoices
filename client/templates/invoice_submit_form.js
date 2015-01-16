Template.invoiceSubmitForm.rendered = function(){
  // On-rendered code here
  //Suppliers.find({OPCO: 6});
}

Template.invoiceSubmitForm.events({
  'click .add-invoice-line': function(e) {
    e.preventDefault();
      var newRow = $('<tr><td><input type="text" class="store" maxlength=4></td><td><input type="text" class="class"></td><td><input type="text" class="unitCost"></td><td><input type="text" class="quantity" value=""></td><td><input type="text" class="style" value=""></td><td><input type="text" class="sku" value=""></td><td><input type="text" class="description" value=""></td><td><a class="remove-invoice-line button-red tiny"><b>×</b></a></td></tr>');

      $('table.flakes-table').append(newRow);
  },

  'click .add-invoice': function(){

    var form = $('.grid-form');
    var table = $('.flakes-table tbody');
    var transactionCode = TransactionCodes.find({transactionCode: parseInt(Session.get('transactionCode')), banner: parseInt(Session.get('opco'))}).fetch();
    var glAccount = _.pluck(transactionCode, 'account');
    console.log("GL Account: " + glAccount);
    var invoiceAmount = 0;
    var totalQuantity = 0;


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
      vendorNumber: form.find('[name=vendorNumbers]').val(),
      invoiceNumber: form.find('[name=invoiceNumber]').val(),
      transactionCode: form.find('[name=transactionCodes]').val(),
      source: form.find('[name=sources]').val(),
      invoiceDate: form.find('[name=invoiceDate]').val(),
      description: form.find('[name=description]').val(),
      urn: form.find('[name=urn]').val(),
      submitted: moment(new Date()).format('L'),
      glAccount: glAccount[0], // Since underscore returns an array, get the
                               // first element, which contains the GL account
    }

    invoice._id = Invoices.insert(invoice);
    console.log(invoice._id);

    /************ Get all the invoice lines ***************/

    // Count the invoice lines
    // var invoiceLineNum = InvoiceLines.find({InvoiceId: invoice._id}).count();
    // console.log(invoiceLineNum);

    var invoiceLineNum = InvoiceLines.find({InvoiceNumber: form.find('[name=invoiceNumber]').val()}).count();
    console.log(invoiceLineNum);

    table.find('tr').each(function() {
      // Increment the invoice line number
      invoiceLineNum++;

      var $tds = $(this).find('td input');
      var unitCost = parseFloat(($tds.eq(2).val()));
      var quantity = parseInt($tds.eq(3).val());
      var invoiceLine = {
        invoiceId: invoice._id,
        invoiceNumber: invoice.invoiceNumber,
        invoiceLineNumber: invoiceLineNum,
        store: parseInt($tds.eq(0).val()),
        itemClass: $tds.eq(1).val(),
        unitCost: numeral(unitCost).format('0,0.00'),
        quantity: quantity,
        style: $tds.eq(4).val(),
        sku: $tds.eq(5).val(),
        description: $tds.eq(6).val(),
        lineTotal: numeral(unitCost * quantity).format('0,0.00'),
        submitted: moment(new Date()).format('L'),
      }

      var lineTotalVar = numeral(unitCost * quantity).format('0,0.00');
      invoiceAmount += numeral().unformat(lineTotalVar);
      totalQuantity += quantity;
      InvoiceLines.insert(invoiceLine);

      // Update variables for header
      var currentInvoice = invoice._id;
      var vendor = Manufacturers.findFaster({department: parseInt(invoice.department), manufacturer: parseInt(invoice.manufacturer)}).fetch();
      // var vendorNumber = _.pluck(vendor, 'supplierSite');
      //
      var invoiceProperties = {
        totalCost: numeral(invoiceAmount).format('0,0.00'),
        totalQuantity: totalQuantity,
        // vendorNumber: vendorNumber
      };
      //console.log(invoiceLineNum);
      //
      Invoices.update(currentInvoice, {$set: invoiceProperties})
    });

    Router.go('invoicePage', invoice);

  },

  'click .remove-invoice-line': function(e) {
    e.preventDefault();
    $('.remove-invoice-line').click(function(event) {
      $(this).closest('tr').remove();
    });
  }
});
