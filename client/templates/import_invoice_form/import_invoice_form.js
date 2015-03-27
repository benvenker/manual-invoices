Template.importInvoiceForm.rendered = function() {
  // Inject all typeahead instances
  Meteor.typeahead.inject();
};

Template.importInvoiceForm.events({
  'click .add-import-invoice': function() {
    var form = $('.grid-form');

    var importInvoice = {};
    form.find('input').each(function() {
      var key = $(this).attr('class');
      var val = $(this).val();
      addKey(importInvoice, key, val);
    });

    var importInvoiceId = ImportInvoices.insert(importInvoice, function(err) {
      if (err) {
        console.log("failed to insert importInvoice");
        alert(err);
      } else {
        alert("Successful ImportInvoice insertion");

        Router.go('importInvoicePage', {_id: importInvoiceId});

        return importInvoiceId;
      }
    });
  }
});