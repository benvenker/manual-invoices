Template.invoiceLinesList.helpers({
  "invoiceLines": function () {
    return InvoiceLines.find({submitted: {$gte: "01/31/2015"}}, {sort: {invoiceNumber: 1}});
  }
});