import * as graphql from 'graphql';

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} = graphql;

const SkillType = new GraphQLObjectType({
  name: 'Skill',
  fields: () => ({
    name: { type: GraphQLString },
    exp: { type: GraphQLInt },
    rank: { type: GraphQLInt },
    level: { type: GraphQLInt },
  }),
});

export default SkillType;
