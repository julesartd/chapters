const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const ChapterSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    nbLessons: {
        type: Number,
        required: true,
        min: [1, 'A chapter must have at least one lesson']
    },
    active: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true,
    toJSON : {
        transform: (doc, ret) => {
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        }
    }
});

const Chapter = mongoose.model('Chapter', ChapterSchema);

module.exports = Chapter;