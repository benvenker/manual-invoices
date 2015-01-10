// Checks the sign of the invoice; defualts to '+' if no values passed
function checkInvoiceSign(invoice, total) {
  if (!invoice || !total) {
    return '+';
  } else {
    if (total > 0) { return '+'; }
    if (total < 0) { return '-'; }
  }
}
