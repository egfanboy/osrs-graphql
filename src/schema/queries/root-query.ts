import * as graphql from 'graphql';
import PlayerType from './types/player';
import HighscoreType from './types/highscore';
import PlayerModel from '../../models/player';

import { resolverArg } from '../../types';

const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    player: {
      type: PlayerType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async function(parentValue: resolverArg, args: resolverArg) {
        const { id } = args;

        return PlayerModel.findOne({ _id: id });
      },
    },
    players: {
      type: GraphQLList(PlayerType),
      resolve() {
        return PlayerModel.find({});
      },
    },
  },
});

export default RootQueryType;
