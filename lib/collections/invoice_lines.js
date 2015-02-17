InvoiceLines = new Mongo.Collection('invoiceLines');

InvoiceLines.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },

  update: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});