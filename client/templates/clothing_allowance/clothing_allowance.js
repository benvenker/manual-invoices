Template.clothingAllowance.rendered = function() {
  Meteor.typeahead.inject();
};

Template.clothingAllowance.events({
  'click .add-invoice-line': function(e) {
    e.preventDefault();
    var newRow = $('  <tr><td><input type="text" class="store" maxlength=4></td><td><input type="text" class="department"></td><td><input type="text" class="cost" maxlength=11></td><td><input type="text" class="lineRetailCost"></td><td><input type="text" class="invoiceNumber" value=""></td><td><input type="text" class="PO" value="" maxlength=20></td><td><input type="text" class="explanation" value="" maxlength=200></td><td><a class="remove-invoice-line button-red tiny"><b>×</b></a></td></tr>');

    $('table.flakes-table').append(newRow);
  },

  'click .submit': function () {
    var form = $('.grid-form');
    var table = $('.flakes-table tbody');
    var header = $('.invoice-header');

    // Get the header values
    var invoice = {};
    header.find('input').each(function() {
      var key = $(this).attr('name');
      var val = $(this).val();
      addKey(invoice, key, val); // Add each header field to the invoice object
    });

    // Get the invoice rows
    var lines = [];
    table.find('tr').each(function () { // Find each table row and get the data
      var line = {};
      $(this).find('td').each(function () { // Data comes from each input in each <tr>
        // Set the key to the class name of input field
        var key = $(this).find("input").attr('class');

        // Set the key value to the input field's value
        var val = $(this).find("input").val();

        addKey(line, key, val); // Custom function to add key value pairs to line obj.
      });
      lines.push(line); // push the line object onto the lines array
    });

    var invoiceProperties = {
      lines: lines,
      submitted: new Date()
    };

    _.extend(invoice, invoiceProperties);

    var invoiceId = Invoices.insert(invoice, function (err) {
      if (err) {
        console.log(invoice.invoiceNumber);
        alert(err);
      } else {
        alert("Success!");
        console.log(invoiceId);
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