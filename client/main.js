// Meteor.subscribe('suppliers', 7, department);
Meteor.subscribe('suppliers');
Meteor.subscribe('fullLine');

// Meteor.subscribe('suppliers', {OPCO: 7});
Meteor.subscribe('manufacturers');
Meteor.subscribe('transactionCodes');

Meteor.subscribe('invoices');
Meteor.subscribe('invoiceLines');
//
//
// Tracker.autorun(function() {
//   var context = InvoicesSchema.namedContext('invoiceSubmitForm');
//   if (!context.isValid()) {
//     console.log(context.invalidKeys());
//   }
// })
