const express = require("express");
const request = require("request");
const router = express.Router();
const xml2js = require("xml2js");
const parser = new xml2js.Parser();
require("dotenv/config");

router.post("/", async (req, res) => {
  try {
    const { street, city, state, zip } = req.body;
    const str =
      'https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=<AddressValidateRequest USERID="' +
      process.env.USPS_USERID +
      '">' +
      "<Address>" +
      "<Address1> </Address1>" +
      `<Address2>${street}</Address2>` +
      `<City>${city}</City>` +
      `<State>${state}</State>` +
      `<Zip5>${zip}</Zip5>` +
      "<Zip4></Zip4>" +
      "</Address>" +
      "</AddressValidateRequest>";
    request(str, (err, response, body) => {
      parser.parseString(body, (error, text) => {
        if (error) {
          return res.status(401).json({ error: error.message });
        }
        const uspsResponse = text.AddressValidateResponse.Address[0];
        if (uspsResponse.Error) {
          return res
            .status(200)
            .json({ error: uspsResponse.Error[0].Description[0] });
        } else {
          return res
            .status(200)
            .json({ message: "Address was successfully validated via USPS !" });
        }
      });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
