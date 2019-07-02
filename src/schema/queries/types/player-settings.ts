import * as graphql from 'graphql';

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} = graphql;

const PlayerSettingsType = new GraphQLObjectType({
  name: 'PlayerSettings',
  fields: () => ({
    player: { type: GraphQLID },
    isIronman: { type: GraphQLBoolean },
    herbIgnoreList: { type: GraphQLList(GraphQLString) },
  }),
});

export default PlayerSettingsType;
