var Sequence = require('../models/sequence');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

const sequenceGenerator = {
  async init() {
    try {
      const sequence = await Sequence.findOne({}).exec();
      if (!sequence) {
        throw new Error('Sequence not found');
      }
      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
    } catch (err) {
      console.error('Error initializing SequenceGenerator:', err);
      throw err;
    }
  },

  async nextId(collectionType) {
    // Ensure the generator is initialized. If not, call the init() function above.
    if (!sequenceId) {
        await this.init();
    }
    var updateObject = {};
    var nextId;

    switch (collectionType) {
        case 'documents':
            maxDocumentId++;
            updateObject = { maxDocumentId: maxDocumentId };
            nextId = maxDocumentId;
            break;
        case 'messages':
            maxMessageId++;
            updateObject = { maxMessageId: maxMessageId };
            nextId = maxMessageId;
            break;
        case 'contacts':
            maxContactId++;
            updateObject = { maxContactId: maxContactId };
            nextId = maxContactId;
            break;
        default:
            return -1;
    }

    try {
        await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });
        return nextId;
    } catch (err) {
        console.log("nextId error = " + err);
        return null;
    }
}

};

module.exports = sequenceGenerator;
