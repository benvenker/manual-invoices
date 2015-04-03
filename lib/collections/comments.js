Comments = new Mongo.Collection('comments');

var Schemas = {};

Schemas.Comment = new SimpleSchema({
  invoiceId: {
    type: String
  },
  body: {
    type: String
  },
  posted: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
  author: {
    type: String
  },
  parent: {
  type: String,
    optional: true
}
});

Comments.attachSchema(Schemas.Comment);


Comments.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },

  update: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  },

  remove: function(userId, doc) {
    // only allow deleting if you are logged in
    return !! userId;
  }
});