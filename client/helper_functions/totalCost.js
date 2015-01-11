function totalCost(invoiceNumber) {
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
