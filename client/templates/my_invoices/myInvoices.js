Template.myInvoices.helpers({
  invoices: function(){
    var userId = Meteor.userId();
    return Invoices.find({userId: userId, exported: false}, {sort: {submitted:-1}});
  },

  ownInvoice: function() {
    return this.userId == Meteor.userId();
  }
});
