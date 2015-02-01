Template.invoiceLinesList.helpers({
  "invoiceLines": function () {
    return InvoiceLines.find({}, {sort: {invoiceNumber: 1}});
  }
});