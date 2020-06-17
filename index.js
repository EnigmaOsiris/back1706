import { typeDefs} from './graphql-schema';
import { ApolloServer } from 'apollo-server-express'
import express from 'express';
import dotenv from 'dotenv'
import {resolvers} from './resolvers';

const neo4j = require('neo4j-driver');
const { makeAugmentedSchema } = require('neo4j-graphql-js');

dotenv.config();

const app = express();


const schema = makeAugmentedSchema({
    typeDefs,
    resolvers,
    config: {
        mutation: {
            exclude:['RatingCount']
        },
        query: {
            exclude: ["RaitingCount"]
        }
    }
});

const driver = neo4j.driver(
    process.env.NEO4J_URI || "bolt://localhost:7687",
    neo4j.auth.basic(
        process.env.NEO4J_USER || "neo4j", 
        process.env.NEO4J_PASSWORD || "neo4j2"
    )
);


// const server = new ApolloServer({
//     context: { driver, neo4jDatabase: process.env.NEO4J_DATABASE||Graph },
//     schema: schema,
//     introspection: true,
//     playground: true,
// });

const server = new ApolloServer({
    schema,
    context: { driver }
});

// Specify host, port and path for GraphQL endpoint
const port = process.env.GRAPHQL_SERVER_PORT || 4001
const path = process.env.GRAPHQL_SERVER_PATH || '/graphql'
const host = process.env.GRAPHQL_SERVER_HOST || 'localhost'

server.applyMiddleware({ app, path })

app.listen({ host, port, path }, () => {
  console.log(`GraphQL server ready at http://${host}:${port}${path}`)
})
