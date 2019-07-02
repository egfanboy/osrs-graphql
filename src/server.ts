import express from 'express';
import expressGraphQL from 'express-graphql';
import bodyParser from 'body-parser';

import schema from './schema/schema';

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

export default app;
