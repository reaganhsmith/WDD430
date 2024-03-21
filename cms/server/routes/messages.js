var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');


router.get('/', (req, res, next) => {
    Message.find().then((messages) => {
        res.status(200).json({
          message: "retrived messages from database!",
          messages: messages
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "OH NO! There was an error retrieving the messages data",
          error: err
        });
      });
  });
  
  
  router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");
  
    const message = new Message({
      id: maxMessageId,
      subject: req.body.name,
      msgText: req.body.msgText,
      sender: req.body.sender
    });
    message.save()
      .then(createdMessage => {
        res.status(201).json({
          message: "message added successfully! YAY",
          message: createdMessage
        });
      }).catch(error => {
        res.status(500).json({
          message: "Error occured. message could not be added.",
          error: error
        });
      });
  });
  
  router.put('/:id', (req, res, next) => {
  
    const docId = req.params.id;
  
    Message.findOne({
        docId
      })
      .then(message => {
        message.subject = req.body.subject;
        message.msgText = req.body.msgText;
        message.sender = req.body.sender;
  
        Message.updateOne({
          docId
        }, message).then(result => {
          res.status(204).json({
            message: "message updated successfully! YAY"
          })
        }).catch(error => {
          res.status(500).json({
            message: "Error occured. message could not be updated.",
            error: error
          });
        });
      }).catch(error => {
        res.status(500).json({
          message: "Error occured. message could not be found.",
          error: error
        });
      });
  });
  
  
  router.delete('/:id', (req, res, next) => {
  
    const docId = req.params.id;
  
    Message.findOne({
        docId
      })
      .then(message => {
        Message.DeleteOne({
          docId
        }).then(result => {
          res.status(204).json({
            message: "message deleted successfully! NICE"
          })
        }).catch(error => {
          res.status(500).json({
            message: "An error occured. message could not be deleted.",
            error: error
          });
        });
      }).catch(error => {
        res.status(500).json({
          message: "An error occured. message could not be found.",
          error: error
        });
      });
  });
  
module.exports = router; 