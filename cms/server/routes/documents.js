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
      res.status(500).json({ error: error.message });
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




router.put('/:id', async (req, res, next) => {
  try {
    const document = await Document.findOne({ id: req.params.id });

    if (!document) {
      return res.status(404).json({
        message: "Document not found."
      });
    }

    document.name = req.body.name;
    document.description = req.body.description;
    document.url = req.body.url;

    const result = await Document.updateOne({ id: req.params.id }, document);

    if (result.nModified === 1) {
      return res.status(204).json({
        message: 'Document updated successfully'
      });
    } else {
      return res.status(500).json({
        message: 'An error occurred. Document could not be updated.'
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});


// DELETE WORKS!!
router.delete('/:id', (req, res, next) => {
  const docId = req.params.id;

  Document.findOneAndDelete({ id: docId }) // Changed documentModel to Document
    .then(result => {
      if (result) {
        res.status(200).json({
          message: "Document deleted successfully!"
        });
      } else {
        res.status(404).json({
          message: "Document not found."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "An error occurred. Document could not be deleted.",
        error: error
      });
    });
});

module.exports = router;
