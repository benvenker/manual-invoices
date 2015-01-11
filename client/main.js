var opco = parseInt(Session.get('opco'));
var department = parseInt(Session.get('department'));

// Meteor.subscribe('suppliers', 7, department);
Meteor.subscribe('suppliers');
Meteor.subscribe('manufacturers');
Meteor.subscribe('transactionCodes');

// Meteor.subscribe('invoices');
// Meteor.subscribe('invoiceLines');
//
//
// Tracker.autorun(function() {
//   var context = InvoicesSchema.namedContext('invoiceSubmitForm');
//   if (!context.isValid()) {
//     console.log(context.invalidKeys());
//   }
// })
