var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');


// Route to get all documents
router.get('/', async (req, res, next) => {
  try {
      const messages = await Message.find();

      res.status(200).json(messages);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
  
  

router.post('/', async (req, res, next) => {
  try {
    // Retrieve the next ID from the sequence generator
    const maxCocumentId = await sequenceGenerator.nextId("contacts");

    // Creating a new document object using the Document model
    const message = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: req.body.sender
  });

    // Saving the new document to the database
    const createdMessage = await message.save();

    res.status(201).json({
      message: 'Message added successfully',
      document: createdDocument
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message
    });
  }
});
  
  
router.delete('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      Contact.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Contact deleted successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem deleting the Contact.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Contact not found.",
        error: err,
      });
    });
});

  
module.exports = router; 