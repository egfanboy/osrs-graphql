import * as graphql from 'graphql';
import SkillType from './skill';
import { resolverArg } from 'src/types';
import { rsSkills } from '../../../utils/contants/rs-skills';

const { GraphQLObjectType } = graphql;

type SkillObject = {
  exp: number;
  level: number;
  rank: number;
};

const getSkillResolver = (skillName: string) => (parentValue: resolverArg) => {
  const skill: SkillObject | undefined = parentValue[skillName];
  if (!skill) {
    throw new Error(`Could not find ${skillName}`);
  }

  return skill;
};

const skillFields = rsSkills.reduce(
  (acc: { [key: string]: any }, skillName: string) => {
    const resolve = getSkillResolver(skillName);
    const type = SkillType;
    acc[skillName] = {
      type,
      resolve,
    };
    return acc;
  },
  {}
);

const AllSkillType = new GraphQLObjectType({
  name: 'AllSkill',
  fields: () => ({
    ...skillFields,
  }),
});

export default AllSkillType;
