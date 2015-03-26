ImportFees = new Mongo.Collection('importFees');

// Make sure import fees collection is populated with data
Meteor.startup(function() {
  if (Meteor.isServer) {
    if (ImportFees.find().count() == 0) {
      ImportFees.insert({
        description: "First Cost",
        glAccount: "01.90.0699.00100.10611.0000.00"
      });

      ImportFees.insert({
        description: "Duty",
        glAccount: "01.90.0699.00100.10612.0000.00"
      });

      ImportFees.insert({
        description: "Commission",
        glAccount: "01.90.0699.00100.10613.0000.00",
        charge: 0.055
      });

      ImportFees.insert({
        description: "Administrative",
        glAccount: "01.90.0699.00100.10614.0000.00",
        charge: 0.014
      });

      ImportFees.insert({
        description: "Other Fees",
        glAccount: "01.90.0699.00100.10615.0000.00",
        charge: 0.003
      });

      ImportFees.insert({
        description: "Freight",
        glAccount: "01.90.0699.00100.10616.0000.00"
      });
    }
  }
});