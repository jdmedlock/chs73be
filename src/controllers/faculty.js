const Airtable = require('airtable')

const retrieveFaculty = async () => {

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE)
  let faculty = []
  const records = await base('Faculty').select({ view: 'Faculty' }).all()
  for(let record of records) {
    faculty.push({
      "confirmed": record.get("Confirmed"),
      "inYearbook": record.get("InYearbook"),
      "firstName": record.get("First Name"),
      "lastName": record.get("Last Name"),
      "department": record.get("Department"),
      "position": record.get("Position"),
      "deceased": record.get("Deceased"),
      "cloudinaryId": record.get("cloudinaryId") === undefined ? "" : record.get("cloudinaryId"),
    })
  }
  return faculty
}

const getFaculty = async (req, res) => {
  const faculty = await retrieveFaculty()
  console.log('faculty getFaculty - faculty.length: ', faculty.length)
  res.set("ok", true).status(200).send(faculty)   
}

exports.getFaculty = getFaculty