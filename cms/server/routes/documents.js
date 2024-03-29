var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document'); // Changed documentModel to Document to match the model definition

// Route to get all documents
router.get('/', async (req, res, next) => {
  try {
    const documents = await Document.find(); // Changed contacts to documents to reflect the fetched data

    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.post('/', async (req, res, next) => {
  try {
    // Retrieve the next ID from the sequence generator
    const maxDocumentId = await sequenceGenerator.nextId("documents");

    // Creating a new document object using the Document model
    const document = new Document({
      id: maxDocumentId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    });

    // Saving the new document to the database
    const createdDocument = await document.save();

    // Responding with status 201 (Created) and the created document object
    res.status(201).json({
      message: 'Document added successfully',
      document: createdDocument
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
  Document.findOne({ id: req.params.id })
    .then(document => {
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

  Document.updateOne({ id: req.params.id }, document)
      .then(result => {
      res.status(204).json({
          message: 'Document updated successfully'
      })
      })
      .catch(error => {
          res.status(500).json({
          message: 'An error occurred while updating the document.',
          error: error
      });
      });
  })
  .catch(error => {
  res.status(404).json({
      message: 'Document not found.',
      // error: { document: 'Document not found'}
      error: error
  });
  });
});


// DELETE WORKS!!
router.delete('/:id', (req, res, next) => {
  Document.findOne({
      id: req.params.id
    })
    .then((doc) => {
      Document.deleteOne({
          id: req.params.id
        })
        .then((result) => {
          res.status(204).json({
            message: "Document deleted successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem deleting the document.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Document not found.",
        error: err,
      });
    });
});

module.exports = router;
