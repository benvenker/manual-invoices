Invoices = new Mongo.Collection('invoices');

Invoices.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});

Meteor.methods({
  invoiceInsert: function(invoiceAttributes) {
    check(Meteor.userId(), String);
    // to match any arguments: check(arguments, [Match.Any])
    //check(invoiceAttributes, {
    //  PO: String,
    //  BOL: String,
    //  totalCost: Number,
    //  totalQuantity: Number,
    //  OPCO: Number,
    //  department: Number,
    //  manufacturer: Number,
    //  vendorName: String,
    //  vendorNumber: Number,
    //  invoiceNumber: String,
    //  transactionCode: Number,
    //  source: String,
    //  invoiceDate: String,
    //  headerDescription: String,
    //  urn: Number,
    //  glAccount: Number
    //}

    var invoiceWithSameVendorAndInvoiceNum = Invoices.findOne({
      invoiceNumber: invoiceAttributes.invoiceNumber,
      vendorName: invoiceAttributes.vendorName,
      vendorNumber: invoiceAttributes.vendorNumber
    });
    if (invoiceWithSameVendorAndInvoiceNum) {
      return {
        invoiceExists: true,
        _id: invoiceWithSameVendorAndInvoiceNum._id
      }
    }

    var user = Meteor.user();
    var invoice = _.extend(invoiceAttributes, {
      userId: user._id,
      author: user.emails[0].address,
      submitted: moment(new Date()).format('L'),

    });
    var invoiceId = Invoices.insert(invoice);
    return {
      _id: invoiceId
    };
  }
});