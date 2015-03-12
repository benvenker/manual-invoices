Meteor.publish("vendorNames", function(){
  self = this;
  var vendorNames = Manufacturers.aggregate([{ $group: {_id: {manufacturerName: $manufacturerName}}}, {$project: {vendorName: "$_id.manufacturerName"}}, {$out: "vendorNames"}]);
  var justVendorNames = _.pluck(everything, "vendorName");

  return _.uniq(justVendorNames);
});

Meteor.publish('transactionCodes', function() {
  return TransactionCodes.findFaster({}, {sort: {transactionCode: 1}});
});


Meteor.publish('invoices', function() {
  return Invoices.findFaster({}, {fields:
  { // Publish all invoice properties except the edit history and the userId of creator
    "edits": 0
    //"userId": 0
  }, sort: {submitted: -1}});
});

Meteor.publish('myInvoices', function() {
  return Invoices.findFaster({}, {fields:
  { // Publish all invoice properties except the edit history and the userId of creator
    "edits": 0
  }, sort: {submitted: -1}});
});

Meteor.publish('approvedInvoices', function() {
  return Invoices.findFaster({approved: true}, {fields:
  { // Publish all invoice properties except the edit history and the userId of creator
    "edits": 0,
    "userId": 0
  }, sort: {submitted: -1}});
});

//// Subscribe to all invoice lines
Meteor.publish('invoiceLines', function(invoice) {
  return InvoiceLines.findFaster({invoiceId: invoice}, {sort: {invoiceId: 1}});
});

// Subscribe to just the invoice to be viewed
Meteor.publish('invoice', function(invoice) {
  return Invoices.findFaster({_id: invoice}, {fields:
  { // Publish all invoice properties except the edit history and the userId of creator
    "edits": 0
    //"userId": 0
  }, sort: {submitted: -1}});
});

// Subscribe just to the current invoice's lines
Meteor.publish('invoicesLines', function(invoice) {
  return InvoiceLines.findFaster({invoiceId: invoice}, {sort: {invoiceId: 1}});
});

Meteor.publish('pendingInvoices', function() {
  return Invoices.findFaster({pending: true}, {fields:
  { // Publish all invoice properties except the edit history and the userId of creator
    "edits": 0
  }, sort: {submitted: -1}});
});

Meteor.publish('exportedInvoices', function() {
  return Invoices.findFaster({exported: true}, {fields: {exported: 1, invoiceNumber: 1, vendorName: 1, totalCost: 1, retailCost: 1, headerDescription: 1, author: 1}, sort: {submitted: -1}});
});

Meteor.publish('rejectedInvoices', function() {
  return Invoices.findFaster({exported: true}, {fields: {rejected: 1, exported: 1, invoiceNumber: 1, vendorName: 1, totalCost: 1, retailCost: 1, headerDescription: 1, author: 1}, sort: {submitted: -1}});
});

Meteor.publish(null, function (){
  return Meteor.roles.find({})
});
