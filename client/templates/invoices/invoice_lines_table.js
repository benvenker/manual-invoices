Template.invoiceLinesTable.rendered = function(){
  // Remove an invoice line from the table
  $('a.remove-invoice-line').click(function(event) {
    $(this).closest('tr').remove();
  });
}

Template.invoiceLinesTable.helpers({
  invoiceLines: function(){
    return InvoiceLines.find({invoiceId: this._id}, {sort: {invoiceLineNumber: 1}});
  }
});

Template.invoiceLinesTable.events({
  'click .remove-invoice-line': function(e) {
    e.preventDefault();
    $(this).closest('tr').remove();
  }
});
