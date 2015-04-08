Template.approvedInvoices.helpers({
  invoices: function(){
    return Invoices.find({status: 'approved'}, {sort: {submitted:-1}});
  }
});