Router.configure
  layoutTemplate: 'layout'
  loadingTemplate: 'loading'
  # waitOn: ->
  #   Meteor.subscribe 'suppliers'

Router.route '/',
  name: "landingPage"

Router.route '/invoice_submit_form',
  name: "invoiceSubmitForm"

Router.route '/invoices_list',
  name: "invoicesList"

Router.route '/invoices/:_id',
  name: 'invoicePage'
  data: ->
    Invoices.findOne @params._id

Router.route "/invoices/:_id/edit",
  name: "invoiceEdit"
  data: ->
    Invoices.findOne @params._id

Router.route "/invoices/rejected",
  name: "rejected"

# Router.route '/submit',
#   name: 'invoiceSubmitForm'

Router.onBeforeAction 'dataNotFound',
  only: 'invoicesPage'
