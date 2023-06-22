const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    bookID: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    averageRating: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      index: true,
    },
    isbn13: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    languageCode: {
      type: String,
      required: true,
    },
    numPages: {
      type: String,
      required: true,
    },
    ratingsCount: {
      type: Number,
      required: true,
    },
    textReviewsCount: {
      type: Number,
      required: true,
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publishers",
    },
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Authors",
        required: true,
      },
    ],
  },
  {
    collection: "Books",
  }
);

bookSchema.pre("save", function (next) {
  if (isNaN(Number(this.averageRating))) {
    this.averageRating = "0.0";
  }
  if (isNaN(Number(this.numPages))) {
    this.numPages = "0";
  }

  next();
});

const Books = mongoose.model("Books", bookSchema);
module.exports = Books;
