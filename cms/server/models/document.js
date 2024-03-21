const mongoose = require('mongoose');

const childDocumentSchema = mongoose.Schema({
    id: {type: String, require: true},
    name: {type: String},
    description: {type: String},
    url: {type: String, required: true},
});

const documentSchema = mongoose.Schema({
    id: {type: String, require: true},
    name: {type: String},
    description: {type: String},
    url: {type: String, required: true},
    children: {type: childDocumentSchema}
});

module.exports = mongoose.model("Document", documentSchema);