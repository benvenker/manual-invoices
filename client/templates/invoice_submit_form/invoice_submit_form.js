Template.invoiceSubmitForm.rendered = function(){
  // Inject all typeahead instances
  Meteor.typeahead.inject();
};

Template.invoiceSubmitForm.events({
  'keydown [name=vendorNumber]': function(e) {
    console.log('event detected');
    isProvided(e, "[name=vendorNumber]", "Vendor Number");
  },

  'keydown [name=department]': function(e) {
    isProvided(e, "[name=department]", "Department");
  },

  'keydown [name=invoiceNumber]': function(e) {
    isProvided(e, "[name=invoiceNumber]", "Invoice Number");
  },

  'keydown .store': function(e) {
    isProvided(e, ".store", "Store");
  },

  'click .add-invoice-line': function(e) {
    e.preventDefault();
    var newRow = $('<tr><td><input type="text" class="store" maxlength=4></td><td><input type="text" class="class"></td><td><input type="text" class="unitCost" maxlength=11></td><td><input type="text" class="lineRetailCost" maxlength=11></td><td><input type="text" class="quantity" value=""></td><td><input type="text" class="style" maxlength=20 value=""></td><td><input type="text" class="sku" value="" maxlength=8></td><td><input type="text" class="description" value="" maxlength=200></td><td><a class="remove-invoice-line button-red tiny"><b>×</b></a></td></tr>');

    $('table.flakes-table').append(newRow);
  },

  'click .add-invoice': function () {
    var form = $('.grid-form');
    var table = $('.flakes-table tbody');
    var header = $('.invoice-header');
    var transactionCode = TransactionCodes.find({ // Get a TransactionCode object
      transactionCode: parseInt(Session.get('transactionCode')),
      banner: parseInt(Session.get('opco'))
    }).fetch();
    var glAccount = _.pluck(transactionCode, 'account'); // Get the GL account from TransactionCode object
    var totalCost = 0;
    var totalQuantity = 0;
    var retailCost = 0;


// Get the header values TODO: Refactor this!!
    var invoice = {};
    header.find('input').each(function() {
      var key = $(this).attr('name');
      var val = $(this).val();
      addKey(invoice, key, val); // Add each input field to the invoice object
    });

    header.find('select').each(function() {
      var key = $(this).attr('name');
      var val = $(this).val();
      addKey(invoice, key, val); // Add each selection field to the invoice object

      console.log(key + ": " + val);
    });

    header.find('textarea').each(function() {
      var key = $(this).attr('name');
      var val = $(this).val();
      addKey(invoice, key, val); // Add each textarea field to invoice object
    });

// Get the invoice rows

    var lines = [];
    table.find('tr').each(function () { // Find each table row and get the data
      var quantity = parseInt( $(this).find('.quantity').val() );
      var unitCost = parseFloat( $(this).find('.unitCost').val() ) ;
      var lineRetailCost = parseFloat( $(this).find('.lineRetailCost').val() );
      var lineTotalVar = numeral(unitCost * quantity).format('00.00');
      var lineRetailCostVar = numeral(lineRetailCost * quantity).format('00.00');

      var line = {};
      $(this).find('td').each(function () { // Data comes from each input in each <tr>
        // Set the key to the class name of input field
        var key = $(this).find("input").attr('class');

        // Set the key value to the input field's value
        var val = $(this).find("input").val();

        addKey(line, key, val); // Custom function to add key value pairs to line obj.
        var invoiceLineProperties = {
          lineTotal: numeral(unitCost * quantity).format('00.00')
        };

        _.extend(line, invoiceLineProperties);

      });
      lines.push(line); // push the line object onto the lines array

      // Increment the invoice header totals by line total
      totalCost += numeral().unformat(lineTotalVar);
      retailCost += numeral().unformat(lineRetailCostVar);
      totalQuantity += quantity;
    });

    var user = Meteor.user();
    var invoiceProperties = {
      lines: lines,
      submitted: new Date(),
      totalCost: numeral(totalCost).format('0.00'),
      retailCost: numeral(retailCost).format('0.00'),
      totalQuantity: totalQuantity,
      author: user.emails[0].address,
      userId: user._id
    };

    _.extend(invoice, invoiceProperties);

    var invoiceId = Invoices.insert(invoice, function (err) {
      if (err) {
        console.log("failed" + invoice.invoiceNumber);
        alert(err);
      } else {
        alert("Success!");
        console.log(invoiceId);
        //Router.go('invoicePage', {_id: invoiceId._id});
        Router.go('invoicePage', {_id: invoiceId});


        return invoiceId;
      }
    });

  },

  'click .remove-invoice-line': function(e) {
    e.preventDefault();
    $('.remove-invoice-line').click(function(event) {
      $(this).closest('tr').remove();
    });
  }
});
