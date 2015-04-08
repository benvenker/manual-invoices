Template.approvedInvoices.helpers({
  invoices: function(){
    return Invoices.find({status: 'approved'}, {sort: {submitted:-1}});
  },

  listGreaterThanOne: function() {
    var invoiceCount = Invoices.find({status: 'approved'}).count();

    if (invoiceCount == 0) {
      return false;
    } else {
      return true;
    }
  }
});