const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { randomUUID } = require('crypto')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET
exports.JWT_SECRET = JWT_SECRET
const PORT = process.env.PORT
const jwt = require('jsonwebtoken')
const User = require('./Models/User')

console.log('connecting to: ', MONGODB_URI)

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to mongoDB')
    })
    .catch((error) => {
        console.log('error connecting to mongoDB: ', error.message)
    })

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)

            const currentUser = await User.findById(decodedToken.id)
            console.log(currentUser)
            return { currentUser }
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
