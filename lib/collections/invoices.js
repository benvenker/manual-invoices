Invoices = new Mongo.Collection('invoices');

Invoices.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});

Meteor.methods({
  invoiceInsert: function(invoiceAtt)
})