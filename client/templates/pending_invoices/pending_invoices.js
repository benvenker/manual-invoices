Template.pendingInvoices.helpers({
  invoices: function(){
    return Invoices.find({exported: false}, {sort: {submitted:-1}});
  }
});
