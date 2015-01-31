Template.invoicesList.helpers({
  invoices: function(){
    return Invoices.find({$or: [{}, {exported: false}]}, {sort: {submitted:-1}});
  }
});
