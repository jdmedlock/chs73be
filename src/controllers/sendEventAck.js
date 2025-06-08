const nodemailjet = require("node-mailjet")

const sendEventAck = async (req, res) => {
  const { order_id, item_description, event_date, 
    order_amount, transaction_status, transaction_creation_time, 
    payer_email_address, payer_firstname, payer_lastname, 
    shipping_address_line_1, shipping_address_line_2, 
    shipping_city, shipping_state, shipping_postal_code, is_sponsor, is_veteran,
    classmateFirstName, classmateLastName, companionFirstName, companionLastName } = req.body

  const mailjet = nodemailjet
    .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

  console.log(`\nAcknowledging payment for ${ item_description } from ${ payer_firstname } ${ payer_lastname} (${ payer_email_address })`)

  if(item_description === '52nd Reunion Picnic') {
    let paymentInstructionLine1 = ''
    let paymentInstructionLine2 = ''
    let paymentInstructionLine3 = ''
    let paymentInstructionLine4 = ''
    let paymentInstructionLine5 = ''
    let paymentInstructionLine6 = ''

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
                "Name": `${ payer_firstname } ${ payer_lastname }`
              }
            ],
            "TemplateID": 4560572,
            "TemplateLanguage": true,
            "Subject": "CHS73 52nd Reunion - You are registered for the Saturday gathering",
            "Variables": {
              "classmateFirstName": `${ payer_firstname }`,
              "classmateLastName": `${ payer_lastname }`,
              "registrationId": `${ order_id }`,
              "orderAmount": `${ order_amount }`,
              "transactionStatus": `${ transaction_status }`,
              "transactionCreated": `${ transaction_creation_time }`,
              "cleaning": "True",
              "classmateEmail": `${ payer_email_address }`,
              "isSponsor": `${ is_sponsor }`,
              "isVeteran": `${ is_veteran }`,
              "classmateBadgeFirstName": `${ classmateFirstName }`,
              "classmateBadgeLastName": `${ classmateLastName }`,
              "companionBadgeFirstName": `${ companionFirstName }`,
              "companionBadgeLastName": `${ companionLastName }`,
              "paymentInstructionLine1": paymentInstructionLine1,
              "paymentInstructionLine2": paymentInstructionLine2,
              "paymentInstructionLine3": paymentInstructionLine3,
              "paymentInstructionLine4": paymentInstructionLine4,
              "paymentInstructionLine5": paymentInstructionLine5,
              "paymentInstructionLine6": paymentInstructionLine6,
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