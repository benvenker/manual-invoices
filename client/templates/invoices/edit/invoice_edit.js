Template.invoiceEdit.rendered = function(){
  var counter = 1;
  $('.add-invoice-line').click(function(event){
    event.preventDefault();
    counter++;
    var newRow = $('<tr><td><input type="text" class="store"></td><td><input type="text" class="class"></td><td><input type="text" class="unitCost"></td><td><input type="text" class="quantity" value=""></td><td><input type="text" class="style" value=""></td><td><input type="text" class="sku" value=""></td><td><input type="text" class="description" value=""></td><td><input type="text" class="lineTotal" value=""></td><td><a class="remove-invoice-line button-red tiny"><b>×</b></a></td></tr>');
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
    var retailCost = 0;

    // Get the header values
    var invoiceProperties = {
      PO: form.find('[name=PO]').val(),
      BOL: form.find('[name=BOL]').val(),
      totalQuantity: form.find('[name=totalQuantity]').val(),
      totalCost: 0,
      OPCO: form.find('[name=OPCOs]').val(),
      department: form.find('[name=department]').val(),
      manufacturer: form.find('[name=manufacturer]').val(),
      vendorName: form.find('[name=vendorName]').val(),
      invoiceNumber: form.find('[name=invoiceNumber]').val(),
      transactionCode: form.find('[name=transactionCode]').val(),
      source: form.find('[name=source]').val(),
      invoiceDate: form.find('[name=invoiceDate]').val(),
      urn: form.find('[name=urn]').val(),
      headerDescription: form.find('[name=headerDescription]').val(),
    };

    Invoices.update(currentInvoiceId, {$set: invoiceProperties});

    /***********  Get all the invoice lines **************/
    // Count the invoice lines
    var invoiceLineNum = InvoiceLines.findFaster({InvoiceNumber: form.find('[name=invoiceNumber]').val()}).count();
    console.log(invoiceLineNum);

    // Edit / add data from rows
    table.find('tr').each(function(i, el) {
      invoiceLineNum++;

      var $tds = $(this).find('td input');
      var unitCost = parseFloat(($tds.eq(2).val()));
      var lineRetailCost = parseFloat(($tds.eq(3).val()));
      var quantity = parseInt($tds.eq(4).val());

      var invoiceLine = {
        invoiceId: currentInvoiceId,
        store: parseInt($tds.eq(0).val()),
        itemClass: $tds.eq(1).val(),
        unitCost: numeral(unitCost).format('00.00'),
        lineRetailCost: numeral(lineRetailCost).format('00.00'),
        quantity: quantity,
        style: $tds.eq(5).val(),
        sku: $tds.eq(6).val(),
        description: $tds.eq(7).val(),
        lineTotal: numeral(unitCost * quantity).format('00.00'),
      }

      var lineTotalVar = numeral(unitCost * quantity).format('00.00');
      invoiceAmount += numeral().unformat(lineTotalVar);
      retailCost += numeral().unformat(lineRetailCost * quantity);
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
        totalCost: numeral(invoiceAmount).format('00.00'),
        retailCost: numeral(retailCost).format('00.00'),
        totalQuantity: totalQuantity,
      };

      Invoices.update(currentInvoiceId, {$set: invoiceProperties})

      // Record the edit time and editor
      var invoiceEditProperties = {
        editDate: new Date(),
        editor: Meteor.user().emails[0].address
      };

      Invoices.update(currentInvoiceId, {$push: {edits: invoiceEditProperties}});

    });
    Router.go('invoicePage', {_id: currentInvoiceId});
  },

  'click .remove-invoice-line': function(e) {
    e.preventDefault();
    $('.remove-invoice-line').click(function(event) {
      $(this).closest('tr').remove();
    });
  },

  'click .cancel-changes': function(e) {
    e.preventDefault();
    if (confirm("Discard changes? \nYou will lose any changes you've made to this invoice.")) {
      var currentInvoiceId = this._id;
      Router.go('/invoices/' + currentInvoiceId);
    }
  },

  'click .delete-invoice': function(e) {
    e.preventDefault();

    if (confirm("Delete this invoice?")) {
      var currentInvoiceId = this._id;
      //Invoices.remove(currentInvoiceId);

      Meteor.call('deleteInvoice', currentInvoiceId);
      console.log('post deleted');
      Router.go('invoicesList');
    }
  }
});
