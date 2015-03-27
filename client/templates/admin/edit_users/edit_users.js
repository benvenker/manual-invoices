Template.editUsers.helpers({
  users: function() {
    return Meteor.users.find().fetch();
  }
});