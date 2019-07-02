import * as graphql from 'graphql';
import { resolverArg } from '../../types';
import osrs from 'osrs-wrapper';

import HighscoreModel from '../../models/highscore';
import PlayerModel from '../../models/player';

import PlayerType from '../queries/types/player';

const { GraphQLID, GraphQLString } = graphql;

type skill = {
  exp: number;
  rank: number;
  level: number;
};

const updatePlayerHighscore = {
  type: PlayerType,
  args: {
    // userId: { type: GraphQLID },
    playerId: { type: GraphQLID },
  },
  resolve: async function(parentValue: resolverArg, args: resolverArg) {
    const { playerId } = args;

    const player = await PlayerModel.findById(playerId).populate('settings');

    if (!player) {
      throw new Error(`No player with id ${playerId.toString()}`);
    }

    return osrs.hiscores.getPlayer(player.username).then(async ({ Skills }) => {
      const skills = Object.entries(Skills).reduce(
        (
          acc: { [key: string]: skill },
          [key, value]
        ): { [key: string]: skill } => {
          const { xp: exp, rank, level } = value;

          acc[key.toLowerCase()] = { exp, rank, level };

          return acc;
        },
        {}
      );

      const {
        id,
        settings: { ironmanType, isIronman },
        highscores,
      } = player;

      const ironType = isIronman ? ironmanType : 'normal';

      const highscore = await new HighscoreModel({
        type: ironType,
        playerId: id,
        ...skills,
      }).save();

      return PlayerModel.findOneAndUpdate(
        { _id: id },
        {
          highscores: [...highscores, highscore.id],
        },
        { new: true }
      );
    });
  },
};

export default updatePlayerHighscore;
