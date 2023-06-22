const mongoose = require("mongoose");

let cachedDB = null;
exports.connectToDatabase = async () => {
  try {
    if (!cachedDB) {
      // Ideally MONGO_URI would be coming from lambda env vars as defined in the CDK stack
      // More explanation below:
      // The environment variables defined in the CDK template are passed to the AWS resources
      // during the deployment process. If you haven't deployed the stack,
      // the environment variables won't be available.

      cachedDB = await mongoose.connect(
        process.env.MONGO_URI ||
          "mongodb+srv://abdulrehmanashfaqwork:Iw2GvZ28VxeORwv6@cluster0.bkl9sns.mongodb.net/books?retryWrites=true&w=majority",
        {}
      );
    }
    return cachedDB;
  } catch (e) {
    console.error(e);
  }
};
