const mongoose = require('mongoose');
const Book = require('./book');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

authorSchema.pre('deleteOne', async function (next) {
    try {
        const authorId = this.getQuery()._id; // Access the ID of the author being deleted
        const books = await Book.find({ author: authorId });

        if (books.length > 0) {
            return next(new Error('This author has books still.'));
        }
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Author', authorSchema);