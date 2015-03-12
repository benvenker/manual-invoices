Template.pendingInvoices.helpers({
  invoices: function(){
    return Invoices.find({pending: true}, {sort: {submitted:-1}});
  }
});
