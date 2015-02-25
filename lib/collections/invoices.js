Invoices = new Mongo.Collection('invoices');


Meteor.methods({
  insertInvoice: function(invoiceAttributes) {
    console.log("method called...");
    check(Meteor.userId(), String);

    //Check for duplicate invoice
    console.log("the invoiceNumber is: " + invoiceAttributes.invoiceNumber);
    var duplicateInvoice = Invoices.findOne({
      invoiceNumber: invoiceAttributes.invoiceNumber});
    if (duplicateInvoice) {
      return {
        invoiceExists: true,
        _id: duplicateInvoice._id
      }
    }

    var user = Meteor.user();
    console.log("about to insert the invoice");
    var invoice = _.extend(invoiceAttributes, {
      userId: user._id,
      author: user.emails[0].address,
      submitted: new Date()
    });

    var invoiceId = Invoices.insert(invoice);
    console.log("this is the invoiceId: " + invoiceId);
    return {
      _id: invoiceId
    };
  },

  deleteInvoice: function(currentInvoiceId) {
    check(Meteor.userId(), String);
    Invoices.remove(currentInvoiceId);
  }
});


Invoices.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },

  update: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },

  //remove: function(userId, doc) {
  //  // only allow deleting if you are logged in
  //  return !! userId;
  //}
});