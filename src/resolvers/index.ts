import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers } from './userResolver';
import problemResolvers from './problemResolvers'

const resolvers = mergeResolvers([userResolvers , problemResolvers]);
export default resolvers;
