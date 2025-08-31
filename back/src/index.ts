import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';

// Ограничение: максимум 100 запросов с одного IP в 15 минут
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
});

async function startServer() {
  dotenv.config();
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => ({
      message: err.message,
      code: err.extensions?.code || 'INTERNAL_SERVER_ERROR',
    }),
  });

  await server.start();

  app.use(
    '/graphql',
    limiter,
    cors({ origin: [`http://localhost:${process.env.FRONT_PORT}`] }),
    bodyParser.json(),
    expressMiddleware(server),
  );

  // Берем порт из .env или используем 3000 по умолчанию
  const PORT = process.env.BACK_PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
