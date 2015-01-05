Template.invoiceLine.rendered = function(){
  $('.remove-invoice-line').click(function(event) {
    event.preventDefault();
    $(this).closest('tr').remove();
  })
}
