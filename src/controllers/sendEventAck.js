const nodemailjet = require("node-mailjet")

const sendEventAck = async (req, res) => {
  const { order_id, item_description, event_date, 
    order_amount, transaction_status, transaction_create_time, 
    payer_email_address, payer_firstname, payer_lastname, 
    shipping_address_line_1, shipping_address_line_2, 
    shipping_city, shipping_state, shipping_postal_code } = req.body
  const mailjet = nodemailjet
    .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

  console.log(`\nAcknowledging payment for ${ item_description } from ${ payer_firstname } ${ payer_lastname} (${ payer_email_address })`)

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
              "Email": `${ payer_email_address }`,
              "Name": `${ payer_firstname } ${ payer_lastname }`
            }
          ],
          "Subject": `CHS73 - Payment received for ${ item_description }`,
          "TextPart": `
            Thank you ${ payer_firstname } for registering for the CHS73 ${ item_description } reunion event \r\n \
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
            Amount: $ ${ order_amount } \r\n \
            Transaction status: ${ transaction_status } \r\n \
            Transaction created: ${ transaction_create_time } \r\n \
            Name: ${ payer_firstname } ${ payer_lastname } \r\n \
            Address: ${ shipping_address_line_1 } \r\n \
                     ${ shipping_address_line_2 } \r\n \
            City: ${ shipping_city } \r\n \
            State: ${ shipping_state } \r\n \
            Zipcode: ${ shipping_postal_code } \r\n \
          `,
          "HTMLPart": ` \
            <div style=\"font-weight: normal; font-size: medium;\"> \
              <p>
                Thank you ${ payer_firstname } for registering for the CHS73 ${ item_description } reunion event!
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
              <div style=\"margin-top: 0rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Order ID: </span>\
                <span style=\"font-weight: normal; font-size: medium;\">${ order_id }</span> \
              </div> \

              <div style=\"margin-top: 0rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Order amount: </span>\
                <span style=\"font-weight: normal; font-size: medium;\">$ ${ order_amount }</span> \
              </div> \

              <div style=\"margin-top: 0rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Transaction status: </span>\
                <span style=\"font-weight: normal; font-size: medium;\">${ transaction_status }</span> \
              </div> \

              <div style=\"margin-top: 0rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Transaction created: </span>\
                <span style=\"font-weight: normal; font-size: medium;\">${ transaction_create_time }</span> \
              </div> \

              <div style=\"margin-top: 0rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Name: </span>\
                <span style=\"font-weight: normal; font-size: medium;\">${ payer_firstname } ${ payer_lastname }</span> \
              </div> \

              <div style=\"margin-top: 0rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Address: </span>\
                <span style=\"font-weight: normal; font-size: medium;\">${ shipping_address_line_1 }</span> \
              </div> \

              <div style=\"margin-top: 0rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\"> </span> \
                <span style=\"font-weight: normal; font-size: medium;\">${ shipping_address_line_2 }</span> \
              </div> \

              <div style=\"margin-top: 0rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">City: </span> \
                <span style=\"font-weight: normal; font-size: medium;\">${ shipping_city }</span> \
              </div> \

              <div style=\"margin-top: 0rem; font-weight: bold; font-size: medium;\"> \
                <span style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\"> State: </span>\
                <span style=\"font-weight: normal; font-size: medium;\">${ shipping_state } Zip code: ${ shipping_postal_code }</span> \
              </div> \
            </div> \
          `,
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

exports.sendEventAck = sendEventAck 