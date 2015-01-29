// Departments = new Mongo.Collection('departments');
// Manufacturers = new Mongo.Collection('manufacturers');

// Meteor.subscribe('departments');

// Meteor.subscribe('suppliers', {OPCO: 7});
// Meteor.subscribe('manufacturers');
// Meteor.subscribe('transactionCodes');
//
Meteor.subscribe('invoices');
Meteor.subscribe('invoiceLines');

// Set dropdown session variables to 'null'
Session.setDefault('opco', null);
Session.setDefault('vendorName', null);
Session.setDefault('vendorNumber', null);
Session.setDefault('department', null);
Session.setDefault('manufacturer', null);
Session.setDefault('transactionCode', null);
Session.setDefault('source', null);


//
//
// Tracker.autorun(function() {
//   var context = InvoicesSchema.namedContext('invoiceSubmitForm');
//   if (!context.isValid()) {
//     console.log(context.invalidKeys());
//   }
// })
