const mongoose = require('mongoose');

const childDocumentSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String },
    description: { type: String },
    url: { type: String, required: true },
});

const documentSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String },
    description: { type: String },
    url: { type: String, required: true },
    children: [childDocumentSchema] // Define children as an array of childDocumentSchema
});

module.exports = mongoose.model("Document", documentSchema);
