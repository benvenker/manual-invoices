Template.vendorList.helpers({
  "vendors": function () {
    return Invoices.findFaster({submitted: {$gte: "01/31/2015"}}, {sort: {invoiceNumber: 1}});
  }
});
