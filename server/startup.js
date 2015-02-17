// Meteor.startup(function() {
//   fs = Npm.require('fs');
//
//   fs.writeFile('../server/ciu.txt', 'Hello CIU', function(err) {
//     if (err) throw err;
//     console.log('It\s saved');
//   });
//
//   fs.writeFile('fixtures.js', function(err) {
//     if (err) throw err;
//     console.log(fixtures.js);
//   })
// })

Meteor.startup(function() {
  Invoices._ensureIndex({submitted: 1});

  process.env.MAIL_URL = 'smtp://postmaster%40sandbox4f4e7e8ba6ce4c4eafda31644883f6fe.mailgun.org:b9f5350629fbd9c8473eda3762847dc2@smtp.mailgun.org:587';
})
