const nodemailjet = require("node-mailjet")

const sendEventAck = async (req, res) => {
  const { order_id, item_description,
    transaction_status, transaction_creation_time, payer_email_address, 
    classmateFirstName, classmateLastName, companionFirstName, companionLastName,
    noAttendees
  } = req.body

  const mailjet = nodemailjet
    .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

  console.log(`\nAcknowledging payment for ${ item_description } from ${ classmateFirstName } ${ classmateLastName } (${ payer_email_address })`)

  if(item_description === '52nd Reunion Picnic') {
    console.log(`\nSending payment acknowledgement email to ${ payer_email_address }`)
    const mailjetReq = mailjet
      .post("send", {'version': 'v3.1'})
      .request({
        "Messages": [
          {
            "From": {
              "Email": `${ process.env.EMAIL_SENDER_ADDR }`,
              "Name": `${ process.env.EMAIL_SENDER_NAME }`
            },
            "To": [
              {
                "Email": `${ payer_email_address }`,
                "Name": `${ classmateFirstName } ${ classmateLastName }`
              }
            ],
            "TemplateID": 7054789,
            "TemplateLanguage": true,
            "Subject": "CHS73 52nd Reunion - You are registered for the Saturday gathering",
            "Variables": {
              "classmateFirstName": `${ classmateFirstName }`,
              "classmateLastName": `${ classmateLastName }`,
              "registrationId": `${ order_id }`,
              "transactionStatus": `${ transaction_status }`,
              "transactionCreated": `${ transaction_creation_time }`,
              "cleaning": "True",
              "classmateEmail": `${ payer_email_address }`,
              "classmateBadgeFirstName": `${ classmateFirstName }`,
              "classmateBadgeLastName": `${ classmateLastName }`,
              "companionBadgeFirstName": `${ companionFirstName }`,
              "companionBadgeLastName": `${ companionLastName }`,
              "noAttendees": `${ noAttendees || 0 }`
            }
          }
        ]
      })
      mailjetReq
        .then(async (result) => {
          res.set("ok", true).status(200).send(`Emailed payment acknowledgement to ${ payer_email_address}`)   
        })
        .catch(async (err) => {
          console.log('Error sending comment: ', err)
          res.set("ok", false).status(500).send(`Email payment acknowledgement failed: `, err)   
        })
  } 
}

exports.sendEventAck = sendEventAck 