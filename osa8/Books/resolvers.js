const { v1: uuid } = require('uuid')
const Author = require('./Models/Author')
const Book = require('./Models/Book')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const User = require('./Models/User')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (!args.author && !args.genre) {
                return await Book.find({}).populate('author')
            }

            if (!args.author) {
                return await Book.find({ genres: args.genre }).populate(
                    'author'
                )
            }
            const author = await Author.findOne({ name: args.author })
            if (!args.genre) {
                return Book.find({ author: author }).populate('author')
            }

            const books = await Book.find({ author: author })
            return books.filter((book) => book.genres.includes(args.genre))
        },
        allAuthors: async () => {
            return Author.find({})
        },
        me: (root, args, context) => {
            //add
            return context.currentUser
        },
    },
    Author: {
        bookCount: async (root) => {
            const author = await Author.findOne({ name: root.name })
            return (await Book.find({ author: author })).length
            /*{
      return books.filter((book) => book.author === root.name).length
  },*/
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const author = await Author.findOne({ name: args.author })
            const book = new Book({ ...args, author: author })
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('User not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }
            try {
                await book.save()
            } catch (error) {
                throw new GraphQLError('Creating book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                })
            }
            return book
        },
        addAuthor: async (root, args) => {
            const author = new Author({ ...args })
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('Creating author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                })
            }
            return author
        },
        //ei vielä tietokantaan
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('User not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }
            const author = await Author.findOne({ name: args.name })
            /*try {
                
            } catch (error) {
                throw new GraphQLError('Finding author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                })
            }*/
            try {
                author.born = args.setBornTo
                await author.save()
            } catch (error) {
                throw new GraphQLError('Saving birthyear failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                })
            }
            return author
        },
        createUser: async (root, args) => {
            //add
            const existingUser = await User.findOne({ username: args.username })
            if (existingUser) {
                throw new GraphQLError('User already exists', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }

            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            })

            return user.save().catch((error) => {
                throw new GraphQLError('Adding user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.username,
                        error,
                    },
                })
            })
        },
        login: async (root, args) => {
            //add
            const user = await User.findOne({
                username: args.username,
            })

            console.log(user)

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('Incorrect username or password', {
                    extensions: { code: 'BAD_USER_INPUT' },
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
}

module.exports = resolvers
