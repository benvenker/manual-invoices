Router.configure
  layoutTemplate: "layout"
  loadingTemplate: "loading"
  waitOn: ->  [
    # put global subscriptions here
  ]

Router.route "/",
  name: "landingPage"
  fastRender: true

Router.route "/invoice_submit_form",
  name: "invoiceSubmitForm"

Router.route "/new_submit_form",  # Alternate invoice structure
  name: "newSubmitForm"

Router.route "/clothing_allowance",
  name: "clothingAllowance"

Router.route "/manual_apron",
  name: "manualApron"

#Router.route "/approved",
#  name: "approvedInvoices",
#  waitOn: ->
#    subs.subscribe 'archivedInvoices'
#  fastRender: true


Router.route "/my_invoices",
  name: "myInvoices"
  waitOn: ->
    subs.subscribe 'invoices'
  fastRender: true

Router.route "/invoices_list",
  name: "invoicesList"
  waitOn: ->
     subs.subscribe 'invoices'
  fastRender: true

Router.route "/approved",
  name: "approvedInvoices"
  waitOn: ->
    subs.subscribe 'exportedInvoices',
    subs.subscribe 'approvedInvoices'
  fastRender: true

Router.route "/invoices/pending",
  name: "pendingInvoices"
  waitOn: ->
    subs.subscribe 'pendingInvoices'
  fastRender: true

Router.route "/invoice_lines_list",
  name: "invoiceLinesList"
  waitOn: ->
    subs.subscribe 'invoiceLines'
  fastRender: true

Router.route "/vendor_list",
  name: "vendorList"

Router.route "/invoices/:_id",
  name: "invoicePage"
  waitOn: ->
    subs.subscribe 'invoice', @params._id
    subs.subscribe 'invoicesLines', @params._id
  data: ->
    Invoices.findOne @params._id
#    InvoiceLines.find @params.invoiceId

Router.route "/approved/invoices/:_id",
  name: "approvedInvoicePage"
  waitOn: ->
    subs.subscribe 'approvedInvoices', @params._id
    subs.subscribe 'invoicesLines', @params._id
  data: ->
    Invoices.findOne @params._id
#    InvoiceLines.find @params.invoiceId

Router.route "/invoices/:_id/edit",
  name: "invoiceEdit"
  waitOn: ->
    subs.subscribe 'invoice', @params._id
    subs.subscribe 'invoicesLines', @params._id
  data: ->
    Invoices.findOne @params._id
#    InvoiceLines.find @params.invoiceId

Router.route "/rejected",
  name: "rejectedInvoices"
  waitOn: ->
    subs.subscribe 'rejectedInvoices'
  fastRender: true

Router.route "/reset-password",
  name: "resetPassword"

Router.route "/forgot_password",
  name: "forgotPassword"

requireLogin = ->
  if !Meteor.user()
    if Meteor.loggingIn()
      @render @loadingTemplate
    else
      @render 'accessDenied'
  else
    @next()
  return

Router.route "import_invoice_form",
  name: "importInvoiceForm"

Router.route "/import_invoices/:_id",
  name: "importInvoicePage"
  waitOn: ->
    subs.subscribe 'importInvoice', @params._id
  data: ->
    ImportInvoices.findOne @params._id
#    InvoiceLines.find @params.invoiceIdage"

Router.route "edit_users",
  name: "editUsers"
  waitOn: ->
    subs.subscribe 'directory'
  fastRender: true

Router.route "/user/:_id",
  name: 'userPage'
  waitOn: ->
    subs.subscribe 'directory', @params._id
    subs.subscribe 'invoices'
  data: ->
    Meteor.users.findOne @params._id

Router.onBeforeAction "dataNotFound",
  only: "invoicesPage"

Router.onBeforeAction requireLogin,
  only: 'invoiceSubmitForm'
#  [
#    'invoiceSubmitForm',
#    'invoicePage',
#    'invoiceEdit',
#    'pendingInvoices',
#    'exportedInvoices',
#    'approved',
#    'rejected'
#  ]
