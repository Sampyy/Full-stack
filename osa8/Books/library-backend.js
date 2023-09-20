const { ApolloServer, gql } = require('apollo-server')
const { randomUUID } = require('crypto')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./Models/Author')
const Book = require('./Models/Book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to: ', MONGODB_URI)

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to mongoDB')
    })
    .catch((error) => {
        console.log('error connecting to mongoDB: ', error.message)
    })

let authors = [
    {
        name: 'Robert Martin',
        id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
        born: 1963,
    },
    {
        name: 'Fyodor Dostoevsky',
        id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
        born: 1821,
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
    },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
 */

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring'],
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
        genres: ['agile', 'patterns', 'design'],
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring'],
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'patterns'],
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'design'],
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'crime'],
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'revolution'],
    },
]

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        bookCount: Int
        id: ID!
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String]
        id: ID!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        Author: Author!
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String]
        ): Book
        addAuthor(name: String!, born: Int): Author
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            return Book.find({})
            /*if (!args.author && !args.genre) {
                return books
            }

            if (!args.author) {
                return books.filter((book) => book.genres.includes(args.genre))
            }

            if (!args.genre) {
                return books.filter((book) => book.author === args.author)
            }

            return books.filter(
                (book) =>
                    book.author === args.author &&
                    book.genres.includes(args.genre)
            )*/
        },
        allAuthors: async () => {
            return Author.find({})
        },
    },
    Author: {
        //ei vielä tietokantaan
        bookCount: (root) => {
            return books.filter((book) => book.author === root.name).length
        },
    },
    Mutation: {
        addBook: async (root, args) => {
            const book = new Book({ ...args })
            return book.save()
            /*
            const book = { ...args, id: uuid() }

            newAuthor = { name: args.author, id: uuid() }
            authors = authors.concat(newAuthor)

            books = books.concat(book)
            return book*/
        },
        addAuthor: (root, args) => {
            const author = new Author({ ...args })
            return author.save()
            /*
            const author = { ...args, id: uuid() }
            authors = authors.concat(author)
            return author*/
        },
        //ei vielä tietokantaan
        editAuthor: (root, args) => {
            //console.log(args.name)
            //console.log(" " + authors[2].name)
            //console.log(args.name === authors[2].name)
            const author = authors.find((a) => a.name === args.name)
            if (!author) {
                console.log('nulled')
                return null
            }
            console.log('args, ' + args.setBornTo)
            const updatedAuthor = { ...author, born: args.setBornTo }
            console.log(updatedAuthor)
            authors.map((author) => {
                /*console.log(
          author.name + ", " + args.name + ", " + (author.name == args.name)
        )*/
                authors = authors.map((author) =>
                    author.name == args.name ? updatedAuthor : author
                )
            })
            console.log(authors)
            return updatedAuthor
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
