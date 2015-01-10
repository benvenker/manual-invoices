Template.sources.events({
  "change .source-selection": function(e, t){
    return Session.set('source', $('[name=sources]').val());
  }
});
