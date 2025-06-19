import Problem from "../models/problemModel";

const resolvers = {

  Mutation: {
    createProblem: async (_: any, { input }: any , context : any) => {
      const newProblem = new Problem({...input , author : context.id});
      return await newProblem.save();
    },
  },
};

export default resolvers;