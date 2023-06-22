const { connectToDatabase } = require("../db/db");
const Books = require("../db/models/bookModel");
const Authors = require("../db/models/authorModel");
const Publishers = require("../db/models/publisherModel");

exports.handler = async ({ fieldAttr, fieldVal, page, perPage }) => {
  try {
    await connectToDatabase();

    const skip = (page - 1) * perPage;
    const limit = perPage;
    let query = {};

    if (fieldAttr === "author") {
      const matchingAuthors = await Authors.find({
        name: { $regex: fieldVal, $options: "i" },
      }).exec();

      const matchingAuthorIds = matchingAuthors.map((author) => author._id);

      query["authors"] = { $in: matchingAuthorIds };
      const books = await Books.find(query)
        .populate({
          path: "authors",
          select: "name",
        })
        .skip(skip)
        .limit(limit)
        .exec();

      return books;
    } else if (fieldAttr == "publisher") {
      const matchingPublishers = await Publishers.find({
        name: { $regex: fieldVal, $options: "i" },
      })
        .skip(skip)
        .limit(limit)
        .exec();

      const matchingPublisherIds = matchingPublishers.map(
        (publisher) => publisher._id
      );

      query["publisher"] = { $in: matchingPublisherIds };
      const books = await Books.find(query)
        .populate({
          path: "publisher",
          select: "name",
        })
        .skip(skip)
        .limit(limit)
        .exec();

      return books;
    } else {
      query[fieldAttr] = { $regex: fieldVal, $options: "i" };
      const books = await Books.find(query).skip(skip).limit(limit).exec();

      return books;
    }
  } catch (e) {
    // Replace with Logger
    console.error(e);
    throw e;
  }
};
