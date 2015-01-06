Template.invoiceSubmitForm.rendered = function(){
  // Add an invoice line to the table
  var counter = 1;
  $('.add-invoice-line').click(function(event){
    event.preventDefault();
    counter++;
    var newRow = $('<tr><td><input type="text" class="store"></td><td><input type="text" class="class"></td><td><input type="text" class="unitCost"></td><td><input type="text" class="quantity" value=""></td><td><input type="text" class="style" value=""></td><td><input type="text" class="sku" value=""></td><td><input type="text" class="description" value=""></td><td><input type="text" class="lineTotal" value=""></td><td><a class="remove-invoice-line button-red tiny"><b>×</b></a></td></tr>');

    $('table.flakes-table').append(newRow);
  });

  // Remove an invoice line from the table
  // $('a.remove-invoice-line').click(function(event) {
  //   $(this).closest('tr').remove();
  // });
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
    var invoiceLineNum = 1;
    table.find('tr').each(function(i, el) {
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
        lineTotal: $tds.eq(7).val()
      }
      InvoiceLines.insert(invoiceLine);
      // Increment the invoice line number
      invoiceLineNum++;
    });
    Router.go('invoicePage', invoice);

  },

  'click .remove-invoice-line': function(e) {
    e.preventDefault();
    $('.remove-invoice-line').click(function(event) {
      $(this).closest('tr').remove();
      Session.set("invoiceLines", counter - 1);
    });
  }
});
