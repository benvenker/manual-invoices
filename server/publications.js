Meteor.publish('departments', function() {
  return Departments.find();
});
// Meteor.publish('departments', function() {
//   var sub = this;
//   var cur = Suppliers.find({}, {sort: {department: 1}, fields: {
//     DEPT_DESC: false,
//     VEN_RES_NUM: false,
//     VNDRTYPECD: false,
//     vendorName: false,
//     vendorNumber: false,
//   }});
//
//   Mongo.Collection._publishCursor(cur, sub, 'departments')
//   return sub.ready();
// });

Meteor.publish('manufacturers', function() {
  return Manufacturers.findFaster({}, {limit: 6000});
});

Meteor.publish('transactionCodes', function() {
  return TransactionCodes.find();
});

Meteor.publish('invoices', function() {
  return Invoices.find();
});

Meteor.publish('invoiceLines', function() {
  return InvoiceLines.find();
})
