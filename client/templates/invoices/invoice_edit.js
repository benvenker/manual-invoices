Template.invoiceEdit.rendered = function(){
  var counter = 1;
  $('.add-invoice-line').click(function(event){
    event.preventDefault();
    counter++;
    var newRow = $('<tr><td><input type="text" class="invoiceLineNumber" value="' + counter + '"></td><td><input type="text" class="store"></td><td><input type="text" class="class"></td><td><input type="text" class="unitCost"></td><td><input type="text" class="quantity" value=""></td><td><input type="text" class="style" value=""></td><td><input type="text" class="sku" value=""></td><td><input type="text" class="description" value=""></td><td><input type="text" class="lineTotal" value=""></td></tr>');
    $('table.flakes-table').append(newRow);
  });
}

Template.invoiceEdit.events({
  'click .add-invoice-line': function() {
    // set the invoice line count to 1 and create counting variable
    var counter = 1;
    Session.set("invoiceLines", counter + 1);
  },

  'click .confirm-changes': function(e){
    e.preventDefault();

    currentInvoiceId = this._id;
    console.log(currentInvoiceId);
    var form = $('.grid-form');
    var table = $('.flakes-table tbody');

    // Get the header values
    var invoiceProperties = {
      PO: form.find('[name=PO]').val(),
      BOL: form.find('[name=BOL]').val(),
      totalQuantity: form.find('[name=totalQuantity]').val(),
      totalCost: form.find('[name=totalCost]').val(),
      OPCO: form.find('[name=OPCO]').val(),
      department: form.find('[name=department]').val(),
      manufacturer: form.find('[name=manufacturer]').val(),
      vendorName: form.find('[name=vendorName]').val(),
      invoiceNumber: form.find('[name=invoiceNumber]').val(),
      transactionCode: form.find('[name=transactionCode]').val(),
      source: form.find('[name=source]').val(),
      invoiceDate: form.find('[name=invoiceDate]').val(),
      description: form.find('[name=description]').val()
    }

    Invoices.update(currentInvoiceId, {$set: invoiceProperties});

    // Get all the invoice lines
    table.find('tr').each(function(i, el) {
      var $tds = $(this).find('td input');
      var invoiceLine = {
        invoiceId: currentInvoiceId,
        invoiceLineNumber: $tds.eq(0).val(),
        store: $tds.eq(1).val(),
        itemClass: $tds.eq(2).val(),
        unitCost: $tds.eq(3).val(),
        quantity: $tds.eq(4).val(),
        style: $tds.eq(5).val(),
        sku: $tds.eq(6).val(),
        description: $tds.eq(7).val(),
        lineTotal: $tds.eq(8).val()
      }

      if ($(this).attr('id')) {
        // Update if existing invoice line
        currentInvoiceLineId = $(this).attr('id');
        InvoiceLines.update(currentInvoiceLineId, {$set: invoiceLine});
      } else {
        // Create new invoice line
        InvoiceLines.insert(invoiceLine);
      }
    });
    Router.go('invoicePage', {_id: currentInvoiceId});
  }
});
