// Departments = new Mongo.Collection('departments');
// Manufacturers = new Mongo.Collection('manufacturers');

// Meteor.subscribe('departments');

Meteor.subscribe('suppliers');

Meteor.subscribe('manufacturers');
// Meteor.subscribe('transactionCodes');
//
Meteor.subscribe('invoices');
Meteor.subscribe('invoiceLines');

// Set dropdown session variables to 'null'
Session.setDefault('opco', null);
Session.setDefault('vendorName', null);
Session.setDefault('vendorNumber', null);
Session.setDefault('department', null);
Session.setDefault('manufacturer', null);
Session.setDefault('transactionCode', null);
Session.setDefault('source', null);

Meteor.startup(function(){
  // initializes all typeahead instances
  Meteor.typeahead.inject();
});


Template.layout.created = function() {
  $(".navigation-expand-target").on('click', function() {
    var toggle = $(this).data('toggle'),
        dist   = toggle ? '0%' : '40%';

    $(".flakes-navigation").animate({ "left" : dist }, 500);
    $(this).data('toggle', !toggle);
  });
}

//
//
// Tracker.autorun(function() {
//   var context = InvoicesSchema.namedContext('invoiceSubmitForm');
//   if (!context.isValid()) {
//     console.log(context.invalidKeys());
//   }
// })
