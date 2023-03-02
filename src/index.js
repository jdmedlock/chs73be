// Try this! https://www.digitalocean.com/community/tutorials/how-to-set-up-a-graphql-server-in-node-js-with-apollo-server-and-sequelize

const { ApolloServer } = require('apollo-server-express')

const express = require('express')
const restRoutes = require('./routes/routes')
const typeDefs = require('./schema/schema')
const resolvers = require('./resolvers')

require('dotenv').config()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

const app = express()

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  next();
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', restRoutes)

apolloServer.applyMiddleware({ app })

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`)
})