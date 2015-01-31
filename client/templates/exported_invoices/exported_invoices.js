Template.exportedInvoices.helpers({
  invoices: function(){
    return Invoices.find({exported: true}, {sort: {submitted:-1}});
  }
});
