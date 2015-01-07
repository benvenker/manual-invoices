Template.invoiceSubmitForm.rendered = function(){
  // On-rendered code here
}

Template.invoiceSubmitForm.events({
  'click .add-invoice-line': function(e) {
    e.preventDefault();
      var newRow = $('<tr><td><input type="text" class="store"></td><td><input type="text" class="class"></td><td><input type="text" class="unitCost"></td><td><input type="text" class="quantity" value=""></td><td><input type="text" class="style" value=""></td><td><input type="text" class="sku" value=""></td><td><input type="text" class="description" value=""></td><td><input type="text" class="lineTotal" value=""></td><td><a class="remove-invoice-line button-red tiny"><b>×</b></a></td></tr>');

      $('table.flakes-table').append(newRow);
  },

  'click .add-invoice': function(){
    var form = $('.grid-form');
    var table = $('.flakes-table tbody');

    // Get the header values
    var invoice = {
      PO: form.find('[name=PO]').val(),
      BOL: form.find('[name=BOL]').val(),
      totalQuantity: form.find('[name=totalQuantity]').val(),
      totalCost: form.find('[name=totalCost]').val(),
      OPCO: form.find('[name=OPCOs]').val(),
      department: form.find('[name=departments]').val(),
      manufacturer: form.find('[name=manufacturers]').val(),
      vendorName: form.find('[name=vendorNames]').val(),
      invoiceNumber: form.find('[name=invoiceNumber]').val(),
      transactionCode: form.find('[name=transactionCodes]').val(),
      // TODO: add SOURCE dropdown here
      invoiceDate: form.find('[name=invoiceDate]').val(),
      description: form.find('[name=description]').val(),
      submitted: moment(new Date()).format('L'),

    }

    invoice._id = Invoices.insert(invoice);
    console.log(invoice._id);

    /************ Get all the invoice lines ***************/

    // Count the invoice lines
    var invoiceLineNum = InvoiceLines.find({InvoiceId: invoice._id}).count();
    console.log(invoiceLineNum);

    table.find('tr').each(function(i, el) {
      // Increment the invoice line number
      invoiceLineNum++;

      var $tds = $(this).find('td input');
      var invoiceLine = {
        invoiceId: invoice._id,
        invoiceLineNumber: invoiceLineNum,
        store: $tds.eq(0).val(),
        itemClass: $tds.eq(1).val(),
        unitCost: $tds.eq(2).val(),
        quantity: $tds.eq(3).val(),
        style: $tds.eq(4).val(),
        sku: $tds.eq(5).val(),
        description: $tds.eq(6).val(),
        lineTotal: $tds.eq(7).val(),
        submitted: moment(new Date()).format('L'),
      }
      InvoiceLines.insert(invoiceLine);

      console.log(invoiceLineNum);
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
