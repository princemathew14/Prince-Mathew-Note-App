const express = require('express');
const Profile = require('../models/profile');
const router = express.Router();

router

  .get('/get_profile/:c', async (req, res) => {
    try {
      console.log("inside get_profile")
      const profile = await Profile.getProfile(req.params.c);
      console.log(profile)
      res.send(profile);

    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

  .put('/caption', async (req, res) => {
    try { 
      const profile = await Profile.edit_caption(req.body);
      console.log(profile)
      res.send({success: "Caption Updated "});

    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

module.exports = router;

