countLines = function(invoice) {
  return Invoices.find({_id: invoice}).fetch()[0].lines.length;
};