
/*
  Get the invoice lines for a given invoice
*/
GetInvoiceLines = function (invoiceNumber) {
  var lines = InvoiceLines.find({invoiceId: invoiceNumber});
  return lines;
}

/*
  Calculate the total cost of an invoice by summming the lineTotal of
  each invoice line
*/
TotalCost = function (invoiceNumber) {
  var lines = getInvoicelines(invoiceNumber).fetch();
  var lineValues = _.pluck(lines, 'lineTotal');

  // Convert line values to numbers
  var lines = _.map(lineValues, function(line) { return parseFloat(line); })

  // Sum the array of values
  var totalCost = lines.reduce(function(previousValue, currentValue){
    return currentValue + previousValue;
  });
  return totalCost;
}
