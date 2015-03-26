Template.archivedInvoices.helpers({
  invoices: function(){
    return Invoices.find({$or: [{archived: true}, {exported: true}]}, {sort: {submitted:-1}});
  }
});