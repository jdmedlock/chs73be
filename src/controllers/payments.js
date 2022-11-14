const Airtable = require('airtable')

const addPayment = async (order_id, item_description, order_amount, 
  transaction_status, transaction_creation_time, transaction_update_time,
  payer_source, payer_email_address, payer_firstname, payer_lastname,
  payer_id, shipping_address_line_1, shipping_address_line_2, 
  shipping_city, shipping_state, shipping_postal_code, shipping_country_code, 
  billing_token, facilitator_access_token, accelerated_payment, soft_descriptor,
  is_sponsor, classmateFirstName, classmateLastName, companionFirstName, companionLastName) => {
  
  const currentDate = new Date()
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE)

  base('Payments').create(
    {
      "Order ID": order_id || '',
      "Item Description": item_description || 'Unknown',
      "Order Create Datetime": transaction_creation_time || currentDate.toISOString(),
      "Order Update Datetime": transaction_update_time || currentDate.toISOString(),
      "Transaction Status": transaction_status || 'Unknown',
      "Order Amount": order_amount || 0,
      "Payer ID": payer_id || '',
      "Payment Source": payer_source || 'Unknown',
      "Payer Email": payer_email_address || '',
      "Payer First Name": payer_firstname || '',
      "Payer Last Name": payer_lastname || '',
      "Accelerated": accelerated_payment || 'false',
      "Billing Token": billing_token || '',
      "Facilitator Access Token": facilitator_access_token || '',
      "Payer Address Line 1": shipping_address_line_1 || '',
      "Payer Address Line 2": shipping_address_line_2 || '',
      "Payer City": shipping_city || '',
      "Payer State": shipping_state || '',
      "Payer Country Code": shipping_country_code || '',
      "Payer Postal Code": shipping_postal_code || '',
      "Soft Descriptor": soft_descriptor || '',
      "Sponsor": is_sponsor || 'No',
      "Classmate Badge-First Name": classmateFirstName,
      "Classmate Badge-Last Name": classmateLastName,
      "Companion Badge-First Name": companionFirstName,
      "Companion Badge-Last Name": companionLastName,
    }, function(err, record) {
      if (err) {
        console.error(err)
        return
      }
      console.log(`Payment record added: ${ record.id }`)
    }
  )
}

const logPayment = async (req, res) => {
  const { order_id, item_description, order_amount, 
    transaction_status, transaction_creation_time, transaction_update_time,
    payer_source, payer_email_address, payer_firstname, payer_lastname,
    payer_id, shipping_address_line_1, shipping_address_line_2, 
    shipping_city, shipping_state, shipping_postal_code, shipping_country_code, 
    billing_token, facilitator_access_token, accelerated_payment, soft_descriptor,
    is_sponsor, classmateFirstName, classmateLastName, companionFirstName, companionLastName } = req.body

  const recordID = await addPayment(order_id, item_description, order_amount, 
    transaction_status, transaction_creation_time, transaction_update_time,
    payer_source, payer_email_address, payer_firstname, payer_lastname,
    payer_id, shipping_address_line_1, shipping_address_line_2, 
    shipping_city, shipping_state, shipping_postal_code, shipping_country_code, 
    billing_token, facilitator_access_token, accelerated_payment, soft_descriptor,
    is_sponsor, classmateFirstName, classmateLastName, companionFirstName, companionLastName)

  // Email the payment receipt to the payee

  res.set("ok", true).status(200).send(`Payment logged: ${ recordID }`)   
}

exports.logPayment = logPayment 