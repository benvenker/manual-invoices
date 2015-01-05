Template.invoiceSubmitForm.rendered = function(){
  var counter = 1;
  $('.add-invoice-line').click(function(event){
    event.preventDefault();
    counter++;
    var newRow = $('<tr><td><input type="text" class="invoiceLineNumber" value="' + counter + '" disabled="true"></td><td><input type="text" class="store"></td><td><input type="text" class="class"></td><td><input type="text" class="unitCost"></td><td><input type="text" class="quantity" value=""></td><td><input type="text" class="style" value=""></td><td><input type="text" class="sku" value=""></td><td><input type="text" class="description" value=""></td><td><input type="text" class="lineTotal" value=""></td></tr>');
    $('table.flakes-table').append(newRow);
  });

  $('.remove-invoice-line').click(function(event) {
    event.preventDefault();
    $(this).closest('tr').remove();
  })
}

Template.invoiceSubmitForm.events({
  'click .add-invoice-line': function() {
    // set the invoice line count to 1 and create counting variable
    var counter = 1;
    Session.set("invoiceLines", counter + 1);
  },

  'click .add-invoice': function(){
    var form = $('.grid-form');
    var table = $('.flakes-table tbody');

    // Get the header values
    var invoice = {
      PO: form.find('[name=PO]').val(),
      BOL: form.find('[name=BOL]').val(),
      totalQuantity: form.find('[name=totalQuantity]').val()
    }

    invoice._id = Invoices.insert(invoice);
    console.log(invoice._id);

    // Get all the invoice lines
    table.find('tr').each(function(i, el) {
      var $tds = $(this).find('td input');
      var invoiceLine = {
        invoiceId: invoice._id,
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
      InvoiceLines.insert(invoiceLine);
    });
    Router.go('invoicePage', invoice);

  }
});
