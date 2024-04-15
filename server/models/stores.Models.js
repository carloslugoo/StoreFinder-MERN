const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    openStatus: {
        type: Boolean,
        default: false
    }
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;