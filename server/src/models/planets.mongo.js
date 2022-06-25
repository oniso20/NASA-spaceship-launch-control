const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        required: true,
    }
});

// connects planetSchema to the "planets" collection
module.exports = mongoose.model('Planet', planetSchema);