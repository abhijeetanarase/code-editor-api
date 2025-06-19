import express, { Application, Request, Response, NextFunction } from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import cors from 'cors';

import typeDefs from './schema';
import resolvers from './resolvers';
import { connectDb } from './configs/connectDB';
import { authContext } from './middlewares/auth';
import { AppError } from './utils/AppError';
import authRoutes from './routes/userRoutes';

dotenv.config();
const app: Application = express();



const startServer = async () => {
  await connectDb();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authContext,
    formatError: (err) => {
      const originalError = err.originalError as AppError;
      return {
        message: err.message || "Internal Server Error",
        statusCode: originalError?.statusCode || 500,
        success: false,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app });
  app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }));
  app.use(express.json());

  app.use('/api/user', authRoutes);

  app.use((err: AppError, req: Request, res: Response, _next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer().catch((err) => {
  console.error("Startup error:", err);
  process.exit(1);
});
