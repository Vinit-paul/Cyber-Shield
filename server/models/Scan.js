const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({

    url: {
        type: String,
        required: true
    },

    httpsStatus: {
        type: String
    },

    headers: {
        type: Object
    },

    missingHeaders: {
        type: Number
    },

    riskLevel: {
        type: String
    },

    ports: {
        type: Array
    },

    vulnerabilities: {
    type: Array
   },

    scanDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Scan", scanSchema);