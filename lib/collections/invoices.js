Invoices = new Mongo.Collection('invoices');

var Schemas = {};

InvoicesSchema = new SimpleSchema({
  vendorNumber: {
    type: Number,
    label: "Vendor Number",
    max: 10
  },
  invoiceNumber: {
    type: String,
    label: "Invoice Number",
    max: 25
  },
  voucherNumber: {
    type: String,
    label: "Voucher Number",
    max: 30
  },
  invoiceDate: {
    type: String,
    label: "Invoice Date",
    max: 8
  },
  invoiceAmountSign: {
    label: "Invoice Amount Sign",
    type: String,
    max: 1
  },
  invoiceAmount: {
    type: Number,
    max: 11
  },
  transactionCode: {
    type: Number,
    max: 3
  },
  invoiceReceivedDate: {
    type: String,
    max: 8
  },
  glDate: {
    type: String,
    max: 8
  },
  description: {
    label: "description",
    type: String,
    max: 200
  }
});

var InvoicesSchemaContext1 = InvoicesSchema.namedContext('invoiceSubmitForm');
