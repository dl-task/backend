const router = require("express").Router();
const path = require("path");
const { unlinkSync } = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Enquiries = require("../models/Enquiries");
const Admin = require("../models/Admin");
const auth = require('../middleware');

const PATHTOCSV = path.join(__dirname, "file.csv");

const csvWriter = createCsvWriter({
  path: PATHTOCSV,
  header: [
    { id: "id", title: "ID" },
    { id: "fullName", title: "Name" },
    { id: "email", title: "EMAIL" },
    { id: "message", title: "MESSAGE" },
  ],
});

router.get("/getCsv", auth, async (req, res) => {
  try {
    const enquiryData = await Enquiries.find({});
    console.log("data", enquiryData);
    if (enquiryData && enquiryData.length > 0) {
      await csvWriter.writeRecords(enquiryData);
      return res.status(200).download(PATHTOCSV, "file.csv", (err) => {
        if (err) console.log(err);
        unlinkSync(PATHTOCSV);
      });
    }
    return res.status(404).send({ error: "No data found" });
  } catch (e) {
    console.log("Error while retrieving csv", e);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/login", async ({ body }, res) => {
  try {
    const { email, password } = body;
    const user = await Admin.findOne({ email }).exec();
    if (!user) {
      return res.status(404).send({ error: "Email does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, "jwtSecret", { expiresIn: "5 days" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (e) {
    console.log("Error logging in", e);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
