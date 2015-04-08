Template.manufacturerTypeahead.helpers({
  'getManufacturers': function(query, callback) {
    Meteor.call('manufacturers', query, {}, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }
      callback(res.map(function(v){ return { value: v.manufacturer}; }));
      console.log("Client fired the manufacturer typeahead method");
    });
  }
});