Template.userPage.helpers({
  invoices: function() {
    return Invoices.find({userId: this._id}).count();
  },

  pending: function() {
    return Invoices.find({userId: this._id, status: 'pending'}).count();
  }
});

Template.userPage.events({
  'click .email': function() {
    // Edit users events here
    var editing = Session.get('isEditingUser');
    if (!editing) {
      Session.set('isEditingUser', true);
    }
  },

  'click .save-changes': function() {
    // Edit users events here

    var firstName = $('[name=firstName').val();
    var lastName = $('[name=lastName').val();
    var newEmail = $('[name=email').val();
    var rolesArray = $('textarea').val().split(' ').join('').split(',');

    // Update the fields
    Meteor.users.update({_id: this._id}, {
      $set: {
        emails: [
          {address: newEmail}
        ],
        profile: {
          firstName: firstName,
          lastName: lastName
        },
        roles: rolesArray
      }
    });
    console.log(Meteor.users.findOne({_id: this._id}))
  },

  'click .delete-user': function() {
    // Delete the user
    if (confirm("Are you sure you want to delete this user?")) {
      Meteor.users.remove({_id: this._id});
      Router.go('editUsers');
    }
  }
});