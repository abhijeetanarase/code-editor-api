import User from '../models/userModel';
import { asyncHandler } from '../utils/asyncHandler';
import { getCache, setCache } from '../utils/cache';
import { paginateAndSearch } from '../utils/paginateAndSearch';

interface User {
  id: string;
  name: string;
  email: string;
}

export const userResolvers = {
  Query: {
    profile: asyncHandler(async (_parent, _args, context) => {
      if (!context.id) throw new Error("Unauthorized");
      const userFromRedis = await getCache<User>(`user:${context.id}`);
      if (userFromRedis) {
        console.log("user from redis", userFromRedis);
        return userFromRedis;
      }
      const user = await User.findById(context.id);
      if (!user) throw new Error("User not found");
      await setCache<User>(`user:${context.id}`, { id: user.id, email: user.email, name: user.name });
      return user;
    }),
  users: asyncHandler(async (_parent, args, context) => {
       const {
        page = 1,
        limit = 10,
        search = '',
        sortBy = 'createdAt',
        sortOrder = -1,
      } = args;

      const filter: Record<string, any> = {};

      return await paginateAndSearch(User, {
        page,
        limit,
        search,
        searchFields: ['name', 'email'], // Adjust as per your schema
        filter,
        sort: { [sortBy]: sortOrder },
      });
    }),
},

};

export default userResolvers;