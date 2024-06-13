const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const {username,password}=req.body;
  if(!username || !password){
    return res.status(400).json({ message: "Username and password are required." });
  }
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists. Please choose a different one." });
  }
  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully." });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  // const bookArray=Object.values(books);
  return res.status(200).send(JSON.stringify({books},null,2));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  const book=books[isbn];
  return res.status(200).send(JSON.stringify(book,null,2));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const autho=req.params.author;
  const author=decodeURIComponent(autho);
  const filteredBooks = Object.values(books).filter(book => book.author === author);
    if (filteredBooks.length > 0) {
        res.status(200).send(JSON.stringify(filteredBooks, null, 2));
    } else {
        res.status(404).json({ message: "Books by this author not found" });
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const titl=req.params.title;
  const title=decodeURIComponent(titl);
  const filteredBooks = Object.values(books).filter(book => book.title === title);
    if (filteredBooks.length > 0) {
        res.status(200).send(JSON.stringify(filteredBooks, null, 2));
    } else {
        res.status(404).json({ message: "Books for this title not found" });
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  const book=books[isbn].reviews;
  return res.status(200).send(book);
});

module.exports.general = public_users;
