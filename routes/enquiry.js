const Enquiries = require('../models/Enquiries');

const router = require('express').Router();

router.post('/contact-us', async ({ body }, res) => {
  try {
    const { fullName, email, message } = body;
    if (!fullName) {
      return res.status(400).send({ error: 'Full Name is required'});
    }

    if (!email) {
      return res.status(400).send({ error: 'Email is required'});
    }

    if (!message) {
      return res.status(400).send({ error: 'Message is required'});
    }
    const payload = {
      fullName,
      email,
      message
    }
    Enquiries.create(payload, (err, data) => {
      if (err) {
        console.log('Error during inserting', err);
        return res.status(400).send({ error: 'Bad Request'});
      }
      console.log('data', data);
      return res.status(200).json(data);
    });
   
  } catch (e) {
    console.log('error while saving contact us details', e);
    return res.status(500);
  }
})

module.exports = router;