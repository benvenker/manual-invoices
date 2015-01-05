Template.invoicesList.helpers({
  invoices: function(){
    return Invoices.find();
  }
});
