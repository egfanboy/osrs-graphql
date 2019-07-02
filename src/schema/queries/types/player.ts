import * as graphql from 'graphql';

import HighscoreType from './highscore';
import PlayerSettingsType from './player-settings';
import { resolverArg } from 'src/types';
import AllSkillType from './all-skills';
import PlayerModel from '../../../models/player';
import NoPlayerError from '../../../exceptions/no-player/no-player';

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} = graphql;

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    username: { type: GraphQLString },
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    rank: {
      type: GraphQLInt,
      resolve: async function(parentValue: resolverArg) {
        const { id } = parentValue;

        const player = await PlayerModel.findOne({
          _id: id,
        });
        if (!player) {
          throw new NoPlayerError(id);
        }

        const { highscores } = player;

        const latestHighscore = highscores[highscores.length - 1];

        return latestHighscore.overall.get('rank');
      },
    },
    currentStats: {
      type: AllSkillType,
      resolve: (parentValue: resolverArg, args: resolverArg) =>
        parentValue.highscores.pop(),
    },
    highscores: {
      type: GraphQLList(HighscoreType),
      resolve: (parentValue: resolverArg, args: resolverArg) =>
        PlayerModel.findOne({ _id: parentValue.id }).then(player => {
          if (!player) {
            throw new NoPlayerError(parentValue.id);
          }
          return player.highscores;
        }),
    },

    settings: {
      type: PlayerSettingsType,
      resolve: (parentValue: resolverArg) => parentValue.settings,
    },
  }),
});

export default PlayerType;
