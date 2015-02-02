Template.exportedInvoices.helpers({
  invoices: function(){
    return Invoices.find({exported: true}, {sort: {exportedDate:-1}});
  }
});
