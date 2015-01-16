Template.invoiceEdit.rendered = function(){
  var counter = 1;
  $('.add-invoice-line').click(function(event){
    event.preventDefault();
    counter++;
    var newRow = $('<tr><td><input type="text" class="store"></td><td><input type="text" class="class"></td><td><input type="text" class="unitCost"></td><td><input type="text" class="quantity" value=""></td><td><input type="text" class="style" value=""></td><td><input type="text" class="sku" value=""></td><td><input type="text" class="description" value=""></td><td><input type="text" class="lineTotal" value=""></td></tr>');
    $('table.flakes-table').append(newRow);
  });
}

Template.invoiceEdit.events({
  'click .add-invoice-line': function() {
    // set the invoice line count to 1 and create counting variable
    var counter = 1;
    Session.set("invoiceLines", counter + 1);
  },

  'click .confirm-changes': function(e){
    e.preventDefault();

    currentInvoiceId = this._id;
    console.log(currentInvoiceId);
    var form = $('.grid-form');
    var table = $('.flakes-table tbody');
    var invoiceAmount = 0;
    var totalQuantity = 0;


    // Get the header values
    var invoiceProperties = {
      PO: form.find('[name=PO]').val(),
      BOL: form.find('[name=BOL]').val(),
      totalQuantity: form.find('[name=totalQuantity]').val(),
      totalCost: 0,
      OPCO: form.find('[name=OPCOs]').val(),
      department: form.find('[name=departments]').val(),
      manufacturer: form.find('[name=manufacturers]').val(),
      vendorName: form.find('[name=vendorName]').val(),
      invoiceNumber: form.find('[name=invoiceNumber]').val(),
      transactionCode: form.find('[name=transactionCode]').val(),
      source: form.find('[name=source]').val(),
      invoiceDate: form.find('[name=invoiceDate]').val(),
      urn: form.find('[name=urn]').val(),
      description: form.find('[name=description]').val()
    }

    Invoices.update(currentInvoiceId, {$set: invoiceProperties});

    /***********  Get all the invoice lines **************/
    // Count the invoice lines
    var invoiceLineNum = InvoiceLines.find({InvoiceNumber: form.find('[name=invoiceNumber]').val()}).count();
    console.log(invoiceLineNum);

    // Edit / add data from rows
    table.find('tr').each(function(i, el) {
      invoiceLineNum++;

      var $tds = $(this).find('td input');
      var unitCost = parseFloat(($tds.eq(2).val()));
      var quantity = parseInt($tds.eq(3).val());
      var invoiceLine = {
        invoiceId: currentInvoiceId,
        invoiceLineNumber: $tds.eq(0).val(),
        store: parseInt($tds.eq(0).val()),
        itemClass: $tds.eq(1).val(),
        unitCost: numeral(unitCost).format('0,0.00'),
        quantity: quantity,
        style: $tds.eq(4).val(),
        sku: $tds.eq(5).val(),
        description: $tds.eq(6).val(),
        lineTotal: numeral(unitCost * quantity).format('0,0.00'),
      }

      var lineTotalVar = numeral(unitCost * quantity).format('0,0.00');
      invoiceAmount += numeral().unformat(lineTotalVar);
      totalQuantity += quantity;

      if ($(this).attr('id')) {
        // Update if existing invoice line
        currentInvoiceLineId = $(this).attr('id');
        InvoiceLines.update(currentInvoiceLineId, {$set: invoiceLine});
      } else {
        // Create new invoice line
        InvoiceLines.insert(invoiceLine);
      }

      // Update variables for header
      //var currentInvoice = invoice._id;
      //
      var invoiceProperties = {
        totalCost: numeral(invoiceAmount).format('$0,0.00'),
        totalQuantity: totalQuantity,
      };
      //console.log(invoiceLineNum);
      //
      Invoices.update(currentInvoiceId, {$set: invoiceProperties})

    });
    Router.go('invoicePage', {_id: currentInvoiceId});
  }
});
