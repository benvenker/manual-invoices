Meteor.publish('departments', function() {
  return Departments.find();
});

Meteor.publish('manufacturers', function() {
  return Manufacturers.findFaster({}, {sort: {manufacturerName: 1}, limit: 3000});
});

Meteor.publish('transactionCodes', function() {
  return TransactionCodes.findFaster({}, {sort: {transactionCode: 1}});
});

Meteor.publish('invoices', function() {
  return Invoices.findFaster({}, {sort: {}});
});

Meteor.publish('invoiceLines', function() {
  return InvoiceLines.find();
})
