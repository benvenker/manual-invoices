Template.invoiceSubmitForm.rendered = function(){
  // On-rendered code here
  Suppliers.find({OPCO: 6});
}

Template.invoiceSubmitForm.events({
  'click .add-invoice-line': function(e) {
    e.preventDefault();
      var newRow = $('<tr><td><input type="text" class="store"></td><td><input type="text" class="class"></td><td><input type="text" class="unitCost"></td><td><input type="text" class="quantity" value=""></td><td><input type="text" class="style" value=""></td><td><input type="text" class="sku" value=""></td><td><input type="text" class="description" value=""></td><td><input type="text" class="lineTotal" value=""></td><td><a class="remove-invoice-line button-red tiny"><b>×</b></a></td></tr>');

      $('table.flakes-table').append(newRow);
  },

  'click .add-invoice': function(){
    /*
    Get the invoice lines for a given invoice
    */
      function getInvoiceLines (invoiceNumber) {
      var lines = InvoiceLines.find({invoiceId: invoiceNumber});
      return lines;
    }

    /*
    Calculate the total cost of an invoice by summming the lineTotal of
    each invoice line
    */
    function totalCost (invoiceNumber) {
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



    alert("you clicked the button!");
    var form = $('.grid-form');
    var table = $('.flakes-table tbody');
    var transactionCode = TransactionCodes.find({transactionCode: parseInt(Session.get('transactionCode')), banner: parseInt(Session.get('opco'))}).fetch();
    var glAccount = _.pluck(transactionCode, 'account');
    console.log("GL Account: " + glAccount);

    // Get the header values
    var invoice = {
      PO: form.find('[name=PO]').val(),
      BOL: form.find('[name=BOL]').val(),
      totalQuantity: form.find('[name=totalQuantity]').val(),
      totalCost: form.find('[name=totalCost]').val(),
      OPCO: form.find('[name=OPCOs]').val(),
      department: form.find('[name=departments]').val(),
      manufacturer: form.find('[name=manufacturers]').val(),
      vendorName: form.find('[name=vendorNames]').val(),
      invoiceNumber: form.find('[name=invoiceNumber]').val(),
      transactionCode: form.find('[name=transactionCodes]').val(),
      source: form.find('[name=sources]').val(),
      invoiceDate: form.find('[name=invoiceDate]').val(),
      description: form.find('[name=description]').val(),
      submitted: moment(new Date()).format('L'),
      glAccount: glAccount[0] // Since underscore returns an array, get the
      // first element, which contains the GL account
    }

    invoice._id = Invoices.insert(invoice);
    console.log(invoice._id);

    /************ Get all the invoice lines ***************/

    // Count the invoice lines
    // var invoiceLineNum = InvoiceLines.find({InvoiceId: invoice._id}).count();
    // console.log(invoiceLineNum);

    var invoiceLineNum = InvoiceLines.find({InvoiceNumber: form.find('[name=invoiceNumber]').val()}).count();
    console.log(invoiceLineNum);

    table.find('tr').each(function(i, el) {
      // Increment the invoice line number
      invoiceLineNum++;

      var $tds = $(this).find('td input');
      var invoiceLine = {
        invoiceId: invoice._id,
        invoiceNumber: invoice.invoiceNumber,
        invoiceLineNumber: invoiceLineNum,
        store: $tds.eq(0).val(),
        itemClass: $tds.eq(1).val(),
        unitCost: $tds.eq(2).val(),
        quantity: $tds.eq(3).val(),
        style: $tds.eq(4).val(),
        sku: $tds.eq(5).val(),
        description: $tds.eq(6).val(),
        lineTotal: $tds.eq(7).val(),
        submitted: moment(new Date()).format('L'),
      }

      InvoiceLines.insert(invoiceLine);

      // Update variables for header
      var currentInvoice = invoice._id;

      var invoiceProperties = {
        totalCost: totalCost(invoice.invoiceNumber)
      }
      console.log(invoiceLineNum);

      Invoices.update(currentInvoice, {$set: invoiceProperties})
    });

    Router.go('invoicePage', invoice);

  },

  'click .remove-invoice-line': function(e) {
    e.preventDefault();
    $('.remove-invoice-line').click(function(event) {
      $(this).closest('tr').remove();
    });
  }
});
