import { ResolverFn } from "../types/ResolverFn";

export const asyncHandler = (resolver: ResolverFn): ResolverFn => {
  return async (parent, args, context, info) => {
    try {
      return await resolver(parent, args, context, info);
    } catch (err) {
      console.error("GraphQL Resolver Error:", err);
      throw new Error(err instanceof Error ? err.message : 'Unknown error');
    }
  };
};