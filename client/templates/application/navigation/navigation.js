Template.navigation.helpers({
  address: function() {
    self = Meteor.user();
    return self.emails[0].address;
  }
});

Template.navigation.events({
  'click .logout': function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('landingPage');
  },
});
