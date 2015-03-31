Template.editUsers.created = function() {
  Session.set('isEditingUser', false);
};

UI.registerHelper('isEditingUser', function() {
  if (Session.get('isEditingUser')) {
    return true;
  } else {
    return false;
  }
});

Template.editUsers.helpers({
  users: function() {
    return Meteor.users.find().fetch();
  }
});

Template.editUsers.events({
  'click .email': function() {
    // Edit users events here
    var editing = Session.get('isEditingUser');
    if (!editing) {
      Session.set('isEditingUser', true);
    }
  },

  'click .edit-user': function() {
    // Edit users events here

  },

  'click .delete-user': function() {
    // Delete the user
    if (confirm("Are you sure you want to delete this user?")) {
      Meteor.users.remove({_id: this._id});
    }
  }
});