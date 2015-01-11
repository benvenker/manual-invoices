// Meteor.publish('suppliers', function(opco, department) {
//   return Suppliers.find({opco: opco, department: department});
// });

Meteor.publish('suppliers', function() {
  return Suppliers.find();
})

Meteor.publish('invoices', function() {
  return Invoices.find();
});

Meteor.publish('manufacturers', function() {
  return Manufacturers.find();
});

Meteor.publish('transactionCodes', function() {
  return TransactionCodes.find();
});

Meteor.publish('invoiceLines', function() {
  return InvoiceLines.find();
})
