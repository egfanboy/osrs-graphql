import * as graphql from 'graphql';
import RootQuery from './queries/root-query';
import mutations from './mutations';

const { GraphQLSchema } = graphql;

export default new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
});
