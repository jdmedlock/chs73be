const Airtable = require('airtable')
const asyncHandler = require('express-async-handler')

const logPayment = (req, res) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE)
  const orderID = req.body.orderid
  res.set("ok", true).status(200).send("Payment logged")   
}

exports.logPayment = logPayment 