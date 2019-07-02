import * as graphql from 'graphql';
import { resolverArg } from '../../types';
import PlayerType from '../queries/types/player';

import PlayerModel from '../../models/player';
import PlayerSettingsModel from '../../models/player-settings';

const { GraphQLID, GraphQLString } = graphql;

const createPlayerMutation = {
  type: PlayerType,
  args: {
    // userId: { type: GraphQLID },
    username: { type: GraphQLString },
  },
  resolve: async function(parentValue: resolverArg, args: resolverArg) {
    const { userId, username } = args;

    const playerSettings = await new PlayerSettingsModel().save();

    const settingsId = playerSettings.id;

    const player = new PlayerModel();

    player.set('username', username);
    player.set('settings', settingsId);

    return player.save();
  },
};

export default createPlayerMutation;
