const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publisherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Publishers",
  }
);

const Publisher = mongoose.model("Publishers", publisherSchema);
exports.Publisher = Publisher;
