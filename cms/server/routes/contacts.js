var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

// Route to get all contacts
router.get('/', async (req, res, next) => {
    try {
        const contacts = await Contact.find().populate("group");
  
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  });



  router.post('/', async (req, res, next) => {
    try {
      // Retrieve the next ID from the sequence generator
      const maxContactId = await sequenceGenerator.nextId("contacts");
  
      // Creating a new contact object using the contact model
      const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        group: req.body.group,
      });
  
      // Saving the new contact to the database
      const createdContact = await contact.save();
  
      // Responding with status 201 (Created) and the created contact object
      res.status(201).json({
        message: 'Contact added successfully',
        contact: createdContact
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred',
        error: error.message
      });
    }
  });


  router.put('/:id', (req, res, next) => {
    const docId = req.params.id;
  
    Contact.findOne({ id: docId }) // Changed contactModel to Contact
      .then(contact => {
        if (!contact) {
          return res.status(404).json({
            message: "contact not found."
          });
        }
  
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
        contact.group = req.body.group;
  
        contact.save()
          .then(updatedContact => {
            res.status(200).json({
              message: "Contact updated successfully!",
              contact: updatedContact
            });
          })
          .catch(error => {
            res.status(500).json({
              message: "Error occurred. contact could not be updated.",
              error: error
            });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: "Error occurred. contact could not be found.",
          error: error
        });
      });
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