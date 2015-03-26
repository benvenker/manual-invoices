subs = new SubsManager();

addKey = function(object, key, val) {
  object[key] = val;
  return object;
};

// App-wide template helpers
UI.registerHelper('formatDollars', function(context, options) {
  if(context)
  return numeral(context).format('$0,0.00');
});

UI.registerHelper('formatDate', function(context, options) {
  if(context)
  return moment(context).format('YYYY-MM-DD')
});