Router.configure
  layoutTemplate: "layout"
  loadingTemplate: "loading"
  waitOn: ->  [
    Meteor.subscribe('departments')
    Meteor.subscribe('manufacturers')
  ]

Router.route "/",
  name: "landingPage"

Router.route "/invoice_submit_form",
  name: "invoiceSubmitForm"

Router.route "/invoices_list",
  name: "invoicesList"

Router.route "/invoices/:_id",
  name: "invoicePage"
  data: ->
    Invoices.findOne @params._id
    # InvoiceLines.find @params.invoiceNumber

Router.route "/invoices/:_id/edit",
  name: "invoiceEdit"
  data: ->
    Invoices.findOne @params._id

Router.route "/invoices/rejected",
  name: "rejected"

Router.onBeforeAction "dataNotFound",
  only: "invoicesPage"
