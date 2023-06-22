const { connectToDatabase } = require("../db/db");
const Books = require("../db/models/bookModel");

exports.handler = async ({
  sortBy = "ratingsCount",
  sortDirection = "DESC",
  page,
  perPage,
}) => {
  try {
    await connectToDatabase();

    let sortOptions = {};

    sortOptions[sortBy] = sortDirection === "DESC" ? -1 : 1;
    const skip = (page - 1) * perPage;
    const limit = perPage;

    const books = await Books.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();

    return books;
  } catch (e) {
    // Replace with a logger
    console.error(e);

    throw e;
  }
};
