// If GL account needs to be manually entered, show the GL account template.
// see /Users/Ben/Nitrous/manual-invoices/client/templates/invoice_submit_form/invoice_submit_form.html,
// line 118: {{#if isGlTemplateRequired}}...{{/if}}
UI.registerHelper('isGlTemplateRequired', function() {
  if(Session.get('glRequired') == true) {
    return true;
  } else {
    return false;
  }
});

UI.registerHelper('isApproved', function() {
  if (Session.get('invoiceStatus') == 'approved') {
    return true;
  } else {
    return false;
  }
});


UI.registerHelper('isPending', function() {
  if (Session.get('invoiceStatus') == 'pending') {
    return true;
  } else {
    return false;
  }
});


UI.registerHelper('isRejected', function() {
  if (Session.get('invoiceStatus') == 'rejected') {
    return true;
  } else {
    return false;
  }
});

// Watch transactionCode session variable.
Tracker.autorun(function() {
  console.log("transCode = " + Session.get('transactionCode'));
  var transCode = Session.get('transactionCode');
  if (transCode == '160' ||
    transCode == '210' ||
    transCode == '211' ||
    transCode == '212' ||
    transCode == '327' ||
    transCode == '500' ||
    transCode == '501') {

    Session.set('glRequired', true)
  } else {
    Session.set('glRequired', false);
  }

});