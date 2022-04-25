const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
  .get('/', (req, res) => {
    try {
      const notes = Note.getNotes();
      res.send(notes);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/addnote', async (req, res) => {
    try {
      const note = await Note.addnote(req.body.notebody);
      res.send(note);
    } catch (error) {
      res.status(401).send({message: error.message});
    }
  })

  
module.exports = router;

