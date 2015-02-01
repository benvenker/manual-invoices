Template.vendorList.helpers({
  "vendors": function () {
    return Invoices.find({submitted: {$gte: "01/31/2015"}}, {sort: {invoiceNumber: 1}});
  }
});
