Template.invoicesList.helpers({
  invoices: function(){
    return Invoices.find({}, {sort: {submitted:-1}});
  }
});
