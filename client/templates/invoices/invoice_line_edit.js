Template.invoiceLineEdit.rendered = function(){
  // Remove an invoice line from the table
  // $('.delete-invoice-line').click(function(event) {
  //   $('.flakes-table').each(function() {
  //     if($('tbody', this).length > 0) {
  //       $('tbody tr:last', this).remove();
  //     } else {
  //       $('tr:last', this).remove();
  //     }
  //   })
  // });

  // $('.delete-invoice-line').click(function(e){
  //   $(this).closest('tr').remove()
  // })
}

Template.invoiceLineEdit.events({
  "click .delete-invoice-line": function(e, t){
    e.preventDefault();

    if (confirm("Delete invoice line?")) {
      var currentInvoiceLineId = this._id;
      InvoiceLines.remove(currentInvoiceLineId)
    }
  }
});
