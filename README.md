ap-portal
=========

This application is a portal for the Accounts Payable division. It's current aims are to provide functionality to suppor the following business needs:

 - A centralized location to house and create documentation related to Acounts Payable (AP) business processes and job functions.
 - A more automated, controlled process of manual invoice entry for the AP Offshore team.

Some initial background information follows below.

## Current State of Manual Invoice Entry
Currently, retailers serve several non-[EDI](https://en.wikipedia.org/wiki/Electronic_data_interchange) vendors. What this means is that these vendors do not (or cannot) send their invoices electronically, in the EDI format.

The business process to support these vendors is the following:
1. Vendors input their invoice invoices in a pre-formatted spreadsheet.
2. IT offshore team copies the contents of the vendor's into an identically formatted spreadsheet, but one that is located inside the HBC network.
3. Many of these invoices must be approved by a U.S.-based manager, but no workflow functionality exists in the spreadsheet currently.
4. Once approved, the invoice can be "submitted", which entails the spreadsheet input being converted into a `.dat` file in the EDI format, which is saved on a LAN drive, for pickup by an automated process that sends it a Common Interface Upload (CIU).

### Process Shortcomings and Issues
This process has several drawbacks to more programmatic, application-centered solution. These drawbacks include:

#### Limited data validation on input
- Frequently, invalid data is inputted and needs to be corrected, but because invoices are not stored in any database, no edit functionality exists. A new invoice must be manually created each time an error is found. Without the ability to reference a database of e.g. already existing invoices (to check for duplicate invoice, for example), there are many opportunities to reduce the need for human approval through automation.

#### No reporting functionality
 - Today, no reporting exists on manual invoices entered, rejected, in need of approval, etc. An application-based solution allows for an account-based roles system that can shuttle invoices in need of approval to the appropriate manager's queue, as well as send invoices that did not pass approval back to the submitter's queue.

#### Limited security
 - In it's current state, the process allows for access privilege for a pre-defined team, defined at the Active Directory level, via access to LAN drives. This does not allow for more fine-grained access to the invoice at different phases in the approval process, and does not prevent anyone without proper privileges from submitting an invoice.

## New AP-Portal Functionality
The new Accounts Payable Portal application will address these issues, and others, in the following ways:

### Manual invoice database
- A database of manual invoices will be created, accessed via a web-based interface. This allows for current and historical reporting on invoices, tracking an invoices current state, etc. The database will be part of a web-based application which will provide an interface for entering invoices into the database, and adding lines to individual invoices (as is done today in the manual process).

#### Role-based privileges
- A role-based system will be created to restrict and grant access to  individuals.

#### Invoice approval and rejection workflow
- Invoices will be put in role-based queues, that are viewable by team members. These will include e.g., manager, approver, submitter.
