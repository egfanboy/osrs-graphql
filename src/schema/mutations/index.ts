import * as graphql from 'graphql';

import createPlayer from './create-player';
import updatePlayerHighscore from './update-highscore';

const { GraphQLObjectType } = graphql;

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: { createPlayer, updatePlayerHighscore },
});

export default mutation;
