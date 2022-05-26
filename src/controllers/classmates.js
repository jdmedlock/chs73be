const Airtable = require('airtable')

const retrieveClassmates = async () => {

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE)
  let classmates = []
  const records = await base('Classmates').select({ view: 'Classmates' }).all()
  for(let record of records) {
    classmates.push({
      "confirmed": record.get("Confirmed"),
      "inYearbook": record.get("inYearbook"),
      "firstName": record.get("firstName"),
      "lastName": record.get("lastName"),
      "marriedLastName": record.get("marriedLastName") === undefined ? "" : record.get("marriedLastName"),
      "volunteer": record.get("volunteer"),
      "deceased": record.get("deceased"),
      "cloudinaryId": record.get("cloudinaryId") === undefined ? "" : record.get("cloudinaryId"),
    })
  }
  return classmates
}

const getClassmates = async (req, res) => {
  const classmates = await retrieveClassmates()
  console.log('classmates getClassmates - classmates.length: ', classmates.length)
  res.set("ok", true).status(200).send(classmates)   
}

exports.getClassmates = getClassmates