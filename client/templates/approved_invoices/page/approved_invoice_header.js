Template.approvedInvoiceHeader.helpers({
  invoices: function() {
    return Invoices.findOne({_id: this._id});
  }
});
