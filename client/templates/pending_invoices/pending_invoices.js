Template.pendingInvoices.helpers({
  invoices: function(){
    return Invoices.find({status: 'pending'}, {sort: {submitted:-1}});
  }
});
