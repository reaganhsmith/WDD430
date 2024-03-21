var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

router.get('/', (req, res, next) => {
  Document.find().then((docs) => {
      res.status(200).json({
        message: "retrived documents from database!",
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

  const document = newDocument({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });
  document.save()
    .then(createdDocument => {
      res.status(201).json({
        message: "document added successfully! YAY",
        document: createdDocument
      });
    }).catch(error => {
      res.status(500).json({
        message: "Error occured. document could not be added.",
        error: error
      });
    });
});

router.put('/:id', (req, res, next) => {

  const docId = req.params.id;

  Document.findOne({
      docId
    })
    .then(document => {
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

      Document.updateOne({
        docId
      }, document).then(result => {
        res.status(204).json({
          message: "document updated successfully! YAY"
        })
      }).catch(error => {
        res.status(500).json({
          message: "Error occured. document could not be updated.",
          error: error
        });
      });
    }).catch(error => {
      res.status(500).json({
        message: "Error occured. document could not be found.",
        error: error
      });
    });
});


router.delete('/:id', (req, res, next) => {

  const docId = req.params.id;

  Document.findOne({
      docId
    })
    .then(document => {
      Document.DeleteOne({
        docId
      }).then(result => {
        res.status(204).json({
          message: "document deleted successfully! NICE"
        })
      }).catch(error => {
        res.status(500).json({
          message: "An error occured. document could not be deleted.",
          error: error
        });
      });
    }).catch(error => {
      res.status(500).json({
        message: "An error occured. document could not be found.",
        error: error
      });
    });
});


module.exports = router;
