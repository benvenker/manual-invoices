Meteor.subscribe('invoices');
Meteor.subscribe('suppliers');
Meteor.subscribe('manufacturers');
Meteor.subscribe('transactionCodes');
Meteor.subscribe('invoiceLines');


Tracker.autorun(function() {
  var context = InvoicesSchema.namedContext('invoiceSubmitForm');
  if (!context.isValid()) {
    console.log(context.invalidKeys());
  }
})
