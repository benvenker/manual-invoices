InvoiceLines = new Mongo.Collection('invoiceLines');

var Schemas = {};

Schemas.InvoiceLines = new SimpleSchema({
  invoiceId: {
    type: String
  },
  line: {
    type: Number,
    optional: true
  },
  store: {
    type: Number,
    min: 5000,
    max: 9999
  },
  itemClass: {
    type: String,
    optional: true
  },
  unitCost: {
    type: Number,
    decimal: true
  },
  lineRetailCost: {
    type: Number,
    decimal: true,
    optional: true,
    autoValue: function() {
      var lineRetailCost = this.field('lineRetailCost');
      if (this.isInsert) {
        if (!lineRetailCost.isSet) {
          return 0.00;
        } else {
          return parseFloat(lineRetailCost);
        }
      }
    }
  },
  quantity: {
    type: Number
  },
  style: {
    type: String,
    optional: true
  },
  sku: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  },
  lineTotal: {
    type: Number,
    decimal: true
  }
});

// Attach the schema
InvoiceLines.attachSchema(Schemas.InvoiceLines);

InvoiceLines.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },

  update: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },

  remove: function(userId, doc) {
    // only allow deleting if you are logged in
    return !! userId;
  }
});