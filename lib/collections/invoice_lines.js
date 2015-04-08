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
    decimal: true,
    autoValue: function() {
      var unitCost = this.field('unitCost');
      if (this.isInsert) {
        return parseFloat(unitCost.value);
      }
    }
  },
  lineRetailCost: {
    type: Number,
    decimal: true,
    optional: true,
    autoValue: function() {
      var lineRetailCost = parseFloat(this.field('lineRetailCost'));
      var quantity = parseInt(this.field('quantity'));
      if (this.isInsert) {
        if (!lineRetailCost.isSet) {
          return 0.00;
        } else {
          return parseFloat(lineRetailCost) || 0;
        }
      }
    }
  },
  quantity: {
    type: Number,
    autoValue: function() {
      var quantity = this.field('quantity');
      if (this.isInsert) {
        return parseInt(quantity.value);
      }
    }
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
    decimal: true,
    autoValue: function() {
      var unitCost = this.field('unitCost');
      var quantity = this.field('quantity');

      if (this.isInsert) {
        return numeral(unitCost * quantity).format('00.00') || 0;
      }
    }
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