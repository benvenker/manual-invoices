Meteor.publish('transactionCodes', function() {
  return TransactionCodes.findFaster({}, {sort: {transactionCode: 1}});
});

Meteor.publish('invoices', function() {
  return Invoices.findFaster({}, {fields: {exported: 1, invoiceNumber: 1, vendorName: 1, totalCost: 1, retailCost: 1, headerDescription: 1, author: 1}, sort: {submitted: -1}});
});

Meteor.publish('invoiceLines', function() {
  return InvoiceLines.findFaster({}, {sort: {invoiceId: 1}});
});

Meteor.publish('pendingInvoices', function() {
  return Invoices.findFaster({exported: false}, {fields: {exported: 1, invoiceNumber: 1, vendorName: 1, totalCost: 1, retailCost: 1, headerDescription: 1, author: 1}, sort: {submitted:-1}});
});

Meteor.publish('exportedInvoices', function() {
  return Invoices.findFaster({exported: true}, {fields: {exported: 1, invoiceNumber: 1, vendorName: 1, totalCost: 1, retailCost: 1, headerDescription: 1, author: 1}, sort: {submitted: -1}});
});

Meteor.publish('rejectedInvoices', function() {
  return Invoices.findFaster({exported: true}, {fields: {rejected: 1, exported: 1, invoiceNumber: 1, vendorName: 1, totalCost: 1, retailCost: 1, headerDescription: 1, author: 1}, sort: {submitted: -1}});
});
