Template.invoicePage.events({
  "click .confirm-changes": function(e, t){
    alert("Invoice Submitted");
  }
});

Template.invoicePage.helpers({
  invoiceLines: function(){
    return InvoiceLines.find({invoiceId: this._id}, {sort: {invoiceLineNumber: 1}});
  }
})
