# books-searching-sorting

This project uses AWS CDK, AWS SAM, AWS API Gateway, AWS Lambda, and MongoDB.

This project implements aws cdk stack to define AWS API Gateway and required lambda functions to apply searching and sorting on Books collection by exposing graphql API

## Getting Started

### Pre Requisites

- NPM and Node installed
- AWS CDK installed
- AWS SAM CLI installed and setup

### Create .env file

Add a `.env` file to the root of your project.

```env
MONGO_URI=mongodb+srv://abdulrehmanashfaqwork:Iw2GvZ28VxeORwv6@cluster0.bkl9sns.mongodb.net/books?retryWrites=true&w=majority
LAMBDA_TIMEOUT_SECS=300
```

#### Required Parameters

1. `MONGO_URI` the location of your mongo server and database name you want. Use the MONGO_URL provided to use the MongoDB ATLAS as db.
2. `LAMBDA_TIMEOUT_SECS` the lambda timeout

### Run Application

- `npm install`

- `cdk synth`

- `sam build -t ./cdk.out/BooksSearchingSortingStack.template.json`

- `sam local start-api`

That's it, the graphQL API through a API gateway proxy will start at `http://localhost:3000/graphql`

## Application Models, Schemas and Queries

## Books

The Books schema represents the structure and properties of books in the application. It defines the fields and their data types

## Queries

### Get Books

Retrieve a list of books with optional sorting, pagination, and filtering. Find the possible values of the fields of query in the variables below.

```graphql
query GetBooks(
  $sortBy: SortBy
  $sortDirection: SortDirection
  $page: Int
  $perPage: Int
) {
  getBooks(
    sortBy: $sortBy
    sortDirection: $sortDirection
    page: $page
    perPage: $perPage
  ) {
    bookID
    title
    averageRating
    isbn
    isbn13
    publicationDate
    languageCode
    numPages
    ratingsCount
    textReviewsCount
    publisher {
      id
      name
    }
    authors {
      _id
      name
    }
  }
}

Variables:
sortBy (optional): Field to sort the books by (bookID, averageRating, numPages, author, publisher).
sortDirection (optional): Sort direction (DESC, ASC).
page (optional): Page number for pagination.
perPage (optional): Number of books per page.
```

### Search Books

Search for books based on a specific field and its value.

```graphql
query SearchBooks(
  $fieldAttr: Field!
  $fieldVal: String!
  $page: Int
  $perPage: Int
) {
  searchBooks(
    fieldAttr: $fieldAttr
    fieldVal: $fieldVal
    page: $page
    perPage: $perPage
  ) {
    bookID
    title
    averageRating
    isbn
    isbn13
    publicationDate
    languageCode
    numPages
    ratingsCount
    textReviewsCount
    publisher {
      id
      name
    }
    authors {
      _id
      name
    }
  }
}

Variables:

fieldAttr (required): Field to search against (title, author, publisher, isbn).
fieldVal (required): Value to match in the specified field.
page (optional): Page number for pagination.
perPage (optional): Number of books per page.
```

## Other GraphQL Playground Examples

After getting the application up and running, please use the following cURLs to test the searching and sorting queries.

### To Get Books and apply sorting

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  --data '{
    "query": "query GetBooks($sortBy: SortBy, $page: Int, $perPage: Int, $sortDirection: SortDirection) { getBooks(sortBy: $sortBy, page: $page, perPage: $perPage, sortDirection: $sortDirection) { bookID title } }",
    "variables": {
      "sortBy": "bookID",
      "page": 1,
      "perPage": 20,
      "sortDirection": "ASC"
    }
  }' \
  http://localhost:3000/graphql


  curl -X POST \
  -H "Content-Type: application/json" \
  --data '{
    "query": "query GetBooks($sortBy: SortBy, $page: Int, $perPage: Int, $sortDirection: SortDirection) { getBooks(sortBy: $sortBy, page: $page, perPage: $perPage, sortDirection: $sortDirection) { bookID title } }",
    "variables": {
       "page": 1,
      "perPage": 20,
     }
  }' \
  http://localhost:3000/graphql
```

### To search books

```bash
 curl -X POST \
  -H "Content-Type: application/json" \
  --data '{
    "query": "query SearchBooks($fieldAttr: Field!, $fieldVal: String!, $page: Int, $perPage: Int) { searchBooks(fieldAttr: $fieldAttr, fieldVal: $fieldVal, page: $page, perPage: $perPage) { bookID title } }",
    "variables": {
      "fieldAttr": "title",
      "fieldVal": "Harry",
      "page": 1,
      "perPage": 20
    }
  }' \
  http://localhost:3000/graphql


   curl -X POST \
  -H "Content-Type: application/json" \
  --data '{
    "query": "query SearchBooks($fieldAttr: Field!, $fieldVal: String!, $page: Int, $perPage: Int) { searchBooks(fieldAttr: $fieldAttr, fieldVal: $fieldVal, page: $page, perPage: $perPage) { bookID title } }",
    "variables": {
      "fieldAttr": "title",
      "fieldVal": "Harry",

    }
  }' \
  http://localhost:3000/graphql

```
