var isEditing = function(id) {
  return Session.equals('isEditing-'+id, true);
};

var setEditing = function(id, isEditing) {
  Session.set('isEditing-'+id, isEditing);
};

Template.inLineEditor.helpers({
  isEditing: function(){
    return isEditing(this._id);
  }
});

Template.inLineEditor.events({
  "click .edit": function(e, t){
    var task = t.data;
    setEditing(task._id, true)
  },

  'click .cancel': function(e, t){
    var task = t.data;
    setEditingTask(task._id, false);
  },

  'submit form': function (e, t) {
    var task = tmpl.data;
    setEditing(task._id, false);
  }
});
