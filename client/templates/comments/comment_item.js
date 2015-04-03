Template.commentItem.helpers({
  date: function() {
    return moment(this.posted).format('llll');
  }
});