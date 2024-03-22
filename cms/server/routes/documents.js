var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

router.get('/', (req, res, next) => {
  Document.find().then((docs) => {
      res.status(200).json({
        message: "Retrieved documents from the database!",
        documents: docs
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "OH NO! There was an error retrieving the documents data",
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  const maxDocumentId = sequenceGenerator.nextId("documents");

  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });
  document.save()
    .then(createdDocument => {
      res.status(201).json({
        message: "Document added successfully!",
        document: createdDocument
      });
    }).catch(error => {
      res.status(500).json({
        message: "Error occurred. Document could not be added.",
        error: error
      });
    });
});

router.put('/:id', (req, res, next) => {
  const docId = req.params.id;

  Document.findOne({ id: docId })
    .then(document => {
      if (!document) {
        return res.status(404).json({
          message: "Document not found."
        });
      }

      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

      document.save()
        .then(updatedDocument => {
          res.status(200).json({
            message: "Document updated successfully!",
            document: updatedDocument
          });
        })
        .catch(error => {
          res.status(500).json({
            message: "Error occurred. Document could not be updated.",
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error occurred. Document could not be found.",
        error: error
      });
    });
});

router.delete('/:id', (req, res, next) => {
  const docId = req.params.id;

  Document.findOneAndDelete({ id: docId })
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
