const nodemailjet = require("node-mailjet")

const sendEventAck = async (req, res) => {
  const { event_description, event_date, 
    order_id, order_amount, transaction_status, transaction_create_time, 
    payer_email, payer_firstname, payer_lastname, payer_address_line_1, payer_address_line_2, 
    payer_city, payer_state, payer_zipcode } = req.body
  const mailjet = nodemailjet
    .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

  console.log(`\nAcknowledging payment for ${ event_description } from ${ fullName } at email: ${ fromEmail }`)

  const mailjetReq = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": `${ process.env.EMAIL_SENDER_ADDR }`,
            "Name": `${ process.env.EMAIL_SENDER_NAME }`
          },
          "To": [
            {
              "Email": `${ payer_email }`,
              "Name": `${ payer_firstname } ${ payer_lastname }`
            }
          ],
          "Subject": `CHS73 - Payment received for ${ event_description }`,
          "TextPart": `
            Thank you ${ payer_firstname } for registering for the CHS73 ${ event_description } reunion event \r\n \
            scheduled for ${ event_date }! \r\n \
            \r\n \
            Your registration and payment for this event has been completed and we are\r\n \
            looking forward to catching up with you and all our classmates then! We'll be\r\n \
            following up throughout 2023 with updates via email and to our website (https://chs73.net). \r\n \
            \r\n \
            Please save this registration receipt for your records and thanks for your support. \r\n \
            \r\n \
            The CHS73 50th Reunion Organizing Committee \r\n \
            \r\n \
            Your registration information:  \r\n \
            \r\n \
            Order ID: ${ order_id } \r\n \
            Amount: ${ order_amount } \r\n \
            Transaction status: ${ transaction_status } \r\n \
            Transaction created: ${ transaction_create_time } \r\n \
            Name: ${ payer_firstname } ${ payer_lastname } \r\n \
            Address: ${ payer_address_line_1 } \r\n \
                     ${ payer_address_line_2 } \r\n \
            City: ${ payer_city } \r\n \
            State: ${ payer_state } \r\n \
            Zipcode: ${ payer_zipcode } \r\n \
          `,
          "HTMLPart": ` \
            <div style=\"font-weight: normal; font-size: medium;\"> \
              <p>
                Thank you ${ payer_firstname } for registering for the CHS73 ${ event_description } reunion event!
              </p>
              <p>
                Your registration and payment for this event has been completed and we are
                looking forward to catching up with you and all our classmates then! We'll be
                following up throughout 2023 with updates via email and to our website (https://chs73.net).
              </p>
              <p>
                Please save this registration receipt for your records and thanks for your support. 
              </p>
                The CHS73 50th Reunion Organizing Committee 
              </p>
              <p>
                Your registration information:  
              </p>
              <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Order ID: </span>\
                <span style=\"font-weight: normal; font-size: medium;\">${ order_id }</span> \
              </div> \

              <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Order amount: </span>\
                <span style=\"font-weight: normal; font-size: medium;\">${ order_amount }</span> \
              </div> \

              <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Transaction status: </span>\
                <span style=\"font-weight: normal; font-size: medium;\">${ transaction_status }</span> \
              </div> \

              <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Transaction created: </span>\
                <span style=\"font-weight: normal; font-size: medium;\">${ transaction_create_time }</span> \
              </div> \

              <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Name: </span>\
                <span style=\"font-weight: normal; font-size: medium;\">${ payer_firstname } ${ payer_lastname }</span> \
              </div> \

              <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Address: </span>\
                <span style=\"font-weight: normal; font-size: medium;\">${ payer_address_line_1 }</span> \
              </div> \

              <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\"> </span> \
                <span style=\"font-weight: normal; font-size: medium;\">${ payer_address_line_2 }</span> \
              </div> \

              <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">City: </span>< \
                <span style=\"font-weight: normal; font-size: medium;\">${ payer_city }</span> \
              </div> \

              <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\"> State: </span>\
                <span style=\"font-weight: normal; font-size: medium;\">${ payer_state } Zip code: ${ payer_zipcode }</span> \
              </div> \
            </div> \
          `,
        }
      ]
    })
  mailjetReq
    .then(async (result) => {
      res.set("ok", true).status(200).send(`Emailed payment acknowledgement to ${ payer_email}`)   
    })
    .catch(async (err) => {
      console.log('Error sending comment: ', err)
      res.set("ok", false).status(500).send(`Email payment acknowledgement failed: `, err)   
    })

}

exports.sendEventAck = sendEventAck 