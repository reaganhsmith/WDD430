var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact'); // Changed ContactModel to Contact to match the model definition

// Route to get all Contacts
router.get('/', async (req, res, next) => {
  try {
      const contacts = await Contact.find(); // Changed contacts to Contacts to reflect the fetched data

      res.status(200).json(contacts);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res, next) => {
  try {
    // Retrieve the next ID from the sequence generator
    const maxContactId = await sequenceGenerator.nextId("contacts");

    // Creating a new Contact object using the Contact model
    const contact = new Contact({
      id: maxContactId,
      name: req.body.name, 
      email: req.body.email, 
      phone: req.body.phone, 
      imageUrl: req.body.imageUrl, 
      group: req.body.group
    });

    // Saving the new Contact to the database
    const createdContact = await contact.save();

    // Responding with status 201 (Created) and the created Contact object
    res.status(201).json({
      message: 'Contact added successfully',
      contact: createdContact
    });
  } catch (error) {
    // If an error occurs, respond with status 500 (Internal Server Error) and an error message
    res.status(500).json({
      message: 'An error occurred',
      error: error.message
    });
  }
});




router.put('/:id', (req, res, next) => {
 Contact.findOne({ id: req.params.id })
    .then(contact => {
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
        contact.group = req.body.group;

      Contact.updateOne({ id: req.params.id }, contact)
        .then(result => {
          res.status(204).json({
            message: 'Contact updated successfully'
          })
        })
        .catch(error => {
           res.status(400).json({
           message: 'An error occurred',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: { contact: 'Contact not found'}
      });
    });
});


// DELETE WORKS!!
router.delete('/:id', (req, res, next) => {
 Contact.findOne({ id: req.params.id })
    .then((cntct) => {
      Contact.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Contact deleted successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem deleting the contact.",
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
