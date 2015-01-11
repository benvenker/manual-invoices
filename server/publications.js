// Meteor.publish('suppliers', function(opco, department) {
//   return Suppliers.find({opco: opco, department: department});
// });

Meteor.publish('suppliers', function() {
  return Suppliers.find({}, {fields: {
    DEPT_DESC: false,
    VEN_RES_NUM: false,
    VNDRTYPECD: false,
    vendorName: false,
    vendorNumber: false,
  }
}, {limit: 100}

);
});

// Meteor.publish('fullLine', function() {
//   return Suppliers.find({OPCO: 6}, {fields: {
//     DEPT_DESC: false,
//     VEN_RES_NUM: false,
//     VNDRTYPECD: false,
//     vendorName: false,
//     vendorNumber: false
//   }});
// });

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
