const book = require("../model/book");

exports.getBooks = async (req, res) => {
  try {
    const books = await book.find();
    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
