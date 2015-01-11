// Departments = new Mongo.Collection('departments');
// Manufacturers = new Mongo.Collection('manufacturers');

// Meteor.subscribe('departments');

// Meteor.subscribe('suppliers', {OPCO: 7});
// Meteor.subscribe('manufacturers');
// Meteor.subscribe('transactionCodes');
//
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
