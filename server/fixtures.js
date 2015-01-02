if (Invoices.find().count() === 0) {
  Invoices.insert({
    PO: '0918043',
    BOL: '01928032',
    totalQuantity: '122',
    totalCost: '234.99',
    OPCO: '06',
    department: '33',
    manufacturer: '344',
    vendorName: 'CHANEL-SK',
    invoiceNumber: '123245',
    transCode: '133',
    source: 'web repair',
    invoiceDate: '2014-12-14',
    description: 'Some really great stuff',
    invoiceLine_1: {
      store: '',
      class: '',
      unitCost: '' ,
      quantity: '',
      style: '',
      sku: '',
      description: '',
      lineTotal: ''
    },
    invoiceLine_2: {
      store: '',
      class: '',
      unitCost: '' ,
      quantity: '',
      style: '',
      sku: '',
      description: '',
      lineTotal: ''
    }
  })
}
