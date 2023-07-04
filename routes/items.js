const router = require("express").Router();
const Cover = require("../models/Cover");
const Food = require("../models/Food");
const Order = require("../models/Order");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.EMAIL_KEY);

// for gettting all items
router.get("/getAllItems", (req, res) => {
  //getting all covers data
  const allData = {};
  Cover.find()
    .then((coverList) => {
      allData.covers = coverList;

      Food.find().then((foodList) => {
        allData.food = foodList;

        return res.json(allData);
      });
    })

    .catch((err) =>
      res.status(500).json({ msg: "unable to fetch the results" })
    );
});

router.post("/sendEmail", (req, res) => {
  const businessEmail = "theindiangoodies@gmail.com";
  const { customerData, itemsOrdered, trackId } = req.body;
  const cData = customerData;
  let shipMeth = "delivery";
  if (cData.shipMethod === "pickup") shipMeth = "";
  if (req.body.customerData === undefined) {
    return res.json({ msg: "Unable to recieve order data at this time." });
  } else {
    const msg = {
      to: [cData.email, businessEmail],
      from: businessEmail,
      subject: "ORDER RECEIPT",
      templateId: "d-fed81955acdd450fab021895a4b5b82a",
      headers: {
        Priority: "Urgent",
        Importance: "high",
      },
      dynamicTemplateData: {
        email: cData.email,
        username: cData.username,
        orderId: trackId,
        phoneNumer: cData.phoneNumer,
        address: cData.address,
        shipMethod: shipMeth,
        orderDate: String(new Date()).substr(0, 24),
        total: cData.total,
        appliedPromo: cData.appliedPromo,
        itemsOrdered,
      },
    };

    sgMail
      .sendMultiple(msg)
      .then((msg) => {
        console.log(msg);
        return res.json({ msg: "emailSentSuccess" });
      })
      .catch((error) => {
        return res.json({ msg: "emailSentFailed" });
      });
  }
});

router.post("/saveData", (req, res) => {
  const order = new Order({
    customerData: req.body.customerData,
    itemsOrdered: req.body.itemsOrdered,
    payer: req.body.payer,
    trackId: req.body.trackId,
    orderStatus: "processing",
  });

  order.save((err, doc) => {
    if (doc) {
      return res.json({ msg: "success" });
    } else {
      return res.json({ msg: err });
    }
  });
});

//tracking order
router.get("/trackOrder", (req, res) => {
  const trackId = req.query.trackId;

  //getting orderStatus
  Order.findOne({ trackId: trackId }, (err, order) => {
    if (err) {
      return res.status(500).json("unable to fetch the results");
    }
    if (order) return res.json(order.orderStatus);

    return res.json("Tracking id is not valid");
  });
});
module.exports = router;
