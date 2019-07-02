import * as graphql from 'graphql';

import SkillType from './skill';
import { resolverArg } from 'src/types';
import AllSkillType from './all-skills';
import { rsSkills } from '../../../utils/contants/rs-skills';
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} = graphql;

const HighscoreType = new GraphQLObjectType({
  name: 'Highscore',
  fields: () => ({
    id: { type: GraphQLID },
    timestamp: { type: GraphQLInt },
    type: { type: GraphQLString },
    skills: {
      type: AllSkillType,
      resolve(parentValue: resolverArg, args: resolverArg) {
        return rsSkills.reduce((acc: { [key: string]: any }, skill: string) => {
          const skillMap: Map<string, number> = parentValue[skill];

          const exp = skillMap.get('exp');
          const level = skillMap.get('level');
          const rank = skillMap.get('rank');

          acc[skill] = { exp, level, rank };

          return acc;
        }, {});

        // return parentValue.highscore;
      },
    },
  }),
});

export default HighscoreType;
