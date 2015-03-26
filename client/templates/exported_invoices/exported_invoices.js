Template.exportedInvoices.helpers({
  invoices: function(){
    return Invoices.findFaster({$or: [{exported: true}, {approved: true}]},{sort: {exportedDate:-1}});
  }
});
