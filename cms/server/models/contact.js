const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    id: {type: String, require: true},
    name: {type: String, require: true},
    email: {type: String},
    phone: {type: String},
    imageUrl: {type: String},
    group: [{type: mongoose.Schema.Types.ObjectId, ref: "Contact"}]
});

module.exports = mongoose.model("Contact", contactSchema);