Template.exportedInvoices.helpers({
  invoices: function(){
    return Invoices.findFaster({exported: true}, {sort: {exportedDate:-1}});
  }
});
