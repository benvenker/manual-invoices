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
    var transactionCodeObj = TransactionCodes.findOne({ // Get a TransactionCode object
      $or:
        [
          {transactionCode: parseInt(Session.get('transactionCode')),
            banner: parseInt(Session.get('opco'))},
          {transactionCode: parseInt(Session.get('transactionCode'))}
        ]
    });
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

    var vendorNumber = parseInt(invoice.vendorNumber);
    console.log('vendorNumber = ' + 0);

    var invoiceId = Invoices.insert(invoice, function (err) {
      if (err) {
        console.log("failed" + vendorNumber);
        alert(err);
      } else {
        console.log(invoiceId);
        console.log("vendor number: " + vendorNumber + " found");

        // Get the invoice rows
        var invoiceLineNumber = 0;  // set counter variable for invoice line
        table.find('tr').each(function () { // Find each table row and get the data
          invoiceLineNumber ++;

          var quantity = parseInt( $(this).find('.quantity').val() );
          var unitCost = parseFloat( $(this).find('.unitCost').val() ) ;
          var lineRetailCost = parseFloat( $(this).find('.lineRetailCost').val() ) || 0;
          var lineTotalVar = numeral(unitCost * quantity).format('00.00') || 0;
          var lineRetailCostVar = numeral(lineRetailCost * quantity).format('00.00') || 0;

          var line = {};
          $(this).find('td').each(function () { // Data comes from each input in each <tr>
            // Set the key to the class name of input field
            var key = $(this).find("input").attr('class');

            // Set the key value to the input field's value
            var val = $(this).find("input").val();

            addKey(line, key, val); // Custom function to add key value pairs to line obj.
            var invoiceLineProperties = {
              lineTotal: numeral(unitCost * quantity).format('00.00'),
              invoiceLineNumber: invoiceLineNumber,
              invoiceId: invoiceId
            };

            _.extend(line, invoiceLineProperties);

          });

          // Increment the invoice header totals by line total
          totalCost += numeral().unformat(lineTotalVar);
          retailCost += numeral().unformat(lineRetailCostVar);
          totalQuantity += quantity;
          console.log("about to insert line " + invoiceLineNumber + " for invoiceId: " + invoiceId);

          // Insert the invoice line
          InvoiceLines.insert(line, function(err) {
            if (err) {
              console.log("failed invoice line insert");
              alert(err);
            } else {
              console.log("InvoiceLine inserted");
            }
          });
        });

        // After the invoice lines are inserted, set the GL account...

        // Find an invoice line for the current invoice and get the store number
        // for the GL account.
        var store = InvoiceLines.findOne({invoiceId: invoiceId}).store;
        console.log("store: " + store);

        // Assign GL account
        var glAccount = '';
        if (Session.get('isGlTemplateRequired') == true) {
          var glForm = $('.gl-account');
          glForm.find('input').each(function() {
            glAccount += $(this).val();
            console.log("this (glAccount): " + invoice.glAccount);
          });
        } else {
          glAccount = completeGlAccount(transactionCodeObj, store, parseInt(Session.get('opco')));
          console.log("glAccount: " + glAccount);
        }

        var user = Meteor.user(); // Get the current user object

        var invoiceProperties = {
          glAccount: glAccount,
          status: 'pending',
          totalCost: numeral(totalCost).format('0.00'),
          retailCost: numeral(retailCost).format('0.00'),
          totalQuantity: totalQuantity,
          author: user.emails[0].address,
          userId: user._id
        };
        console.log("invoiceProperties.glAccount: " + invoiceProperties.glAccount);

        Invoices.update(invoiceId, {$set: invoiceProperties}, function(err) {
          if (err) {
            alert(err)
          } else {
            console.log("invoice updated");
          }
        });

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
