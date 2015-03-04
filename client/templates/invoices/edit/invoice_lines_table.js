Template.invoiceLinesTable.rendered = function(){
  // Remove an invoice line from the table
  $('a.remove-invoice-line').click(function(event) {
    $(this).closest('tr').remove();
  });
}

Template.invoiceLinesTable.helpers({
  invoiceLines: function() {
    var self = Invoices.find({_id: this._id}, {sort: {invoiceLineNumber: 1}}).fetch();
    console.log(self[0].lines);
    return self[0].lines;
  }
});

Template.invoiceLinesTable.events({
  'click .remove-invoice-line': function(e) {
    e.preventDefault();
    $(this).closest('tr').remove();
  }
});
