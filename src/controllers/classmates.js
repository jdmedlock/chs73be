const Airtable = require('airtable')

// Retrieve the number of Applications for the matching starting & ending 
// date range
const getClassmatesJSON = async () => {
  return new Promise(async (resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE)
    let classmates = []

    base('Classmates').select({ 
      view: 'Classmates' 
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      records.forEach(function (record) {
        classmates.push({
          "confirmed": record.fields.Confirmed,
          "inYearbook": record.fields.inYearbook,
          "firstName": record.fields.firstName,
          "lastName": record.fields.lastName,
          "marriedLastName": record.fields.marriedLastName === undefined ? "" : record.fields.marriedLastName,
          "volunteer": record.fields.volunteer,
          "deceased": record.fields.deceased,
          "cloudinaryId": record.fields.cloudinaryId === undefined ? "" : record.fields.cloudinaryId,
        })
      })

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage()
    }, function done(err) {
      if (err) { 
        console.error(err)
        return
      }
      //console.log(`Record count: ${ recordCount }`)
      //console.log('Classmates: ', classmates)
      resolve(classmates)
    })
  })
}

export { getClassmatesJSON }