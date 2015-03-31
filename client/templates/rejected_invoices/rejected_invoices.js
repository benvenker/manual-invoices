Template.rejectedInvoices.helpers({
  invoices: function() {
    return Invoices.find({status: 'rejected'});
  }
});