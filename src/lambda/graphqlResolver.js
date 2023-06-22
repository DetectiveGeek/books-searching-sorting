const { ApolloServer, gql } = require("apollo-server-lambda");
const getBooks = require("./books/getBooks");
const searchBooks = require("./books/searchBooks");

const typeDefs = gql`
  enum SortBy {
    bookID
    averageRating
    numPages
    author
    publisher
  }
  enum Field {
    title
    author
    publisher
    isbn
  }
  enum SortDirection {
    DESC
    ASC
  }
  type Author {
    _id: ID!
    name: String!
  }
  type Publisher {
    id: ID!
    name: String!
  }
  type Book {
    bookID: Int
    title: String
    averageRating: String
    isbn: String
    isbn13: String
    publicationDate: String
    languageCode: String
    numPages: String
    ratingsCount: Int
    textReviewsCount: Int
    publisher: Publisher
    authors: [Author]
  }

  type Query {
    getBooks(
      sortBy: SortBy
      sortDirection: SortDirection
      page: Int
      perPage: Int
    ): [Book]
  }
  type Query {
    searchBooks(
      fieldAttr: Field!
      fieldVal: String!
      page: Int
      perPage: Int
    ): [Book]
  }
`;

const resolvers = {
  Query: {
    getBooks: async (_, { sortBy, sortDirection, page = 1, perPage = 20 }) => {
      return await getBooks.handler({ sortBy, sortDirection, page, perPage });
    },
    searchBooks: async (_, { fieldAttr, fieldVal, page = 1, perPage = 20 }) => {
      return await searchBooks.handler({ fieldAttr, fieldVal, page, perPage });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
