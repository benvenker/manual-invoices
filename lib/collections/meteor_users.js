Meteor.users.allow({
  'update': function() {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  'remove': function() {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  'insert': function() {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  }
});