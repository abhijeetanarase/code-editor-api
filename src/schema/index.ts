import { mergeTypeDefs } from '@graphql-tools/merge';
import userTypeDefs from './userTypeDefs'
import problemTypeDefs from "./problemTypeDefs"

const typeDefs = mergeTypeDefs([userTypeDefs , problemTypeDefs]);
export default typeDefs;