Template.navigation.helpers({
  emails: function() {
    self = Meteor.user();
    return self.emails;
  }
});

Template.navigation.events({
  'click .logout': function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('landingPage');
  }
});
