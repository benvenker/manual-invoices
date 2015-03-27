ImportInvoices = new Mongo.Collection('importInvoices');

var Schemas = {};

Schemas.ImportInvoice = new SimpleSchema({
  preparedBy: {
    type: String,
    label: 'Prepared By'
  },
  invoiceDate: {
    type: String,
    label: "Invoice Date",
    autoValue: function() {
      var invoiceDate = this.field('invoiceDate');
      if (this.isInsert) {
        return moment(invoiceDate).format('DDMMYYYY');
      }
    }
  },
  vendorNumber: {
    type: String,
    label: 'Vendor Name',
    min: 7,
    max: 7
  },
  vendorName: {
    type: String,
    label: "Vendor Name",
    autoValue: function() {
      var vendorName = this.field('vendorName');
      if (this.isInsert) {
        return vendorName.value.substring(0,22);
      }
    }
  },
  department: {
    type: Number,
    label: "Department",
    max: 999
  },
  PO : {
    type: String,
    label: "PO"
  },
  postRef: {
    type: String
  },
  firstCost: {
    type: Number,
    decimal: true
  },
  duty: {
    type: Number,
    decimal: true
  },
  freight: {
    type: Number,
    decimal: true
  },
  admin: {
    type: Number,
    decimal: true,
    autoValue: function() {
      var firstCost = this.field('firstCost').value;
      var admin = ImportFees.findOne({description: "Administrative"});
      if (this.isInsert) {
        return firstCost * admin.charge;
      }
    }
  },
  commission: {
    type: Number,
    decimal: true,
    autoValue: function() {
      var firstCost = this.field('firstCost').value;
      var commission = ImportFees.findOne({description: "Commission"});
      if (this.isInsert) {
        return firstCost * commission.charge;
      }
    }
  },
  otherFees: {
    type: Number,
    decimal: true,
    autoValue: function() {
      var firstCost = this.field('firstCost').value;
      var importFee = ImportFees.findOne({description: "Other Fees"});
      if (this.isInsert) {
        return firstCost * importFee.charge;
      }
    }
  }
});

ImportInvoices.attachSchema(Schemas.ImportInvoice);

ImportInvoices.allow({
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