const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    userID: { type: String, required: true },
    guildID: { type: String, required: true },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: new Date() }
});

Schema.index({ userID: 1, guildID: 1 }, { unique: true });

module.exports = mongoose.model("Levels", Schema);