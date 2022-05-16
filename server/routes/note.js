const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router

  .get('/get_note/:c', async (req, res) => {
    try {
      console.log("inside get_note")
      const note = await Note.getNote(req.params.c);
      console.log(note)
      res.send(note);

    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

  .post('/add_note', async (req, res) => {
    try {
      const note = await Note.add_note(req.body);
      console.log(note)
      res.send({success: "Note added "});

    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      console.log(req.body);
      await Note.deleteNote(req.body.noteId);
      res.send({success: "Note Deleted"});
    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

  
module.exports = router;

