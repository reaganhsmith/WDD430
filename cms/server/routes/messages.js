var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message'); // Changed messageModel to message to match the model definition

// Route to get all messages
router.get('/', async (req, res, next) => {
  try {
      const messages = await Message.find(); // Changed contacts to messages to reflect the fetched data

      res.status(200).json(messages);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res, next) => {
  try {
    // Retrieve the next ID from the sequence generator
    const maxMessageId = await sequenceGenerator.nextId("messages");

    // Creating a new message object using the message model
    const message = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: req.body.sender
    });

    // Saving the new message to the database
    const createdMessage = await message.save();

    // Responding with status 201 (Created) and the created message object
    res.status(201).json({
      message: 'message added successfully',
      message: createdMessage
    });
  } catch (error) {
    // If an error occurs, respond with status 500 (Internal Server Error) and an error message
    res.status(500).json({
      message: 'An error occurred',
      error: error.message
    });
  }
});



module.exports = router;
