Router.configure
  layoutTemplate: 'layout'
  loadingTemplate: 'loading'
  # waitOn: ->
  #   Meteor.subscribe 'invoices'

Router.route '/',
  name: "invoiceSubmitForm"

Router.route '/invoices/:_id',
  name: 'invoicePage'
  data: ->
    Invoices.findOne @params._id

Router.route "/invoices/:_id/edit",
  name: "invoiceEdit"
  data: ->
    Invoices.findOne @params._id

# Router.route '/submit',
#   name: 'invoiceSubmitForm'

Router.onBeforeAction 'dataNotFound',
  only: 'invoicesPage'
