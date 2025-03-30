const express = require('express');
const bookRoute = express.Router();
let Book = require('../model/Book');

// Get all Books
bookRoute.route('/books').get((req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => {
      console.error(`Error fetching books: ${error}`);
      res.status(500).json({ message: 'Error fetching books' });
    });
});

// Add a book
bookRoute.route('/add-book').post((req, res) => {
  Book.create(req.body)
    .then((book) => {
      console.log('Book added successfully.');
      res.status(201).json(book);
    })
    .catch((error) => {
      console.error(`Could not save book: ${error}`);
      res.status(500).json({ message: 'Error adding book' });
    });
});

// Update a book by ID
bookRoute.route('/update-book/:id').put((req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedBook) => {
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      console.log('Book updated successfully.');
      res.status(200).json(updatedBook);
    })
    .catch((error) => {
      console.error(`Could not update book: ${error}`);
      res.status(500).json({ message: 'Error updating book' });
    });
});

// Delete a book by ID
bookRoute.route('/delete-book/:id').delete((req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then((deletedBook) => {
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      console.log('Book deleted successfully.');
      res.status(200).json({ message: 'Book deleted' });
    })
    .catch((error) => {
      console.error(`Could not delete book: ${error}`);
      res.status(500).json({ message: 'Error deleting book' });
    });
});

module.exports = bookRoute;
