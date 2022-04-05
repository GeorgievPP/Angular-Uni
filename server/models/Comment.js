const { Schema, model } = require('mongoose');

const schema = new Schema({
    description: { type: String, required: [true, 'Description is required!'], maxlength: [1024, 'Maximum description length is 1024!'] },
    createdAt: { type: Date, default: Date.now },
    author: { type: String, required: true },
    jimHelper: { type: String, required: true },
    post: { type: String, required: true },
});

module.exports = model('Comment', schema);
