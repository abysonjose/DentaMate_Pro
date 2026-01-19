import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Database } from './config/database';
import logger from './utils/logger';
import authRoutes from './routes/auth.routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

class AuthApp {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security
    this.app.use(helmet());

    // CORS
    const corsOptions = {
      origin: process.env.CORS_ORIGIN?.split(',') || '*',
      credentials: true,
      optionsSuccessStatus: 200
    };
    this.app.use(cors(corsOptions));

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Request logging
    this.app.use((req: Request, _res: Response, next) => {
      logger.info(`${req.method} ${req.path}`);
      next();
    });
  }

  private initializeRoutes(): void {
    // Health check
    this.app.get('/health', (_req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: 'Auth Service is healthy',
        data: {
          service: 'dentamate-auth-service',
          version: '1.0.0',
          uptime: process.uptime(),
          timestamp: new Date().toISOString(),
          database: Database.isConnected() ? 'connected' : 'disconnected'
        }
      });
    });

    // API routes
    this.app.use('/api/v1/auth', authRoutes);

    // Root endpoint
    this.app.get('/', (_req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: 'DentaMate Auth Service v1',
        data: {
          version: '1.0.0',
          endpoints: {
            health: '/health',
            auth: '/api/v1/auth'
          }
        },
        timestamp: new Date().toISOString()
      });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public async listen(): Promise<void> {
    const port = parseInt(process.env.PORT || '3001', 10);

    // Connect to database
    await Database.connect();

    this.app.listen(port, () => {
      logger.info(`🚀 DentaMate Auth Service started on port ${port}`);
      logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`💾 Database: ${Database.isConnected() ? 'Connected' : 'Disconnected'}`);
      logger.info(`🔐 JWT Expiry: ${process.env.JWT_EXPIRY || '24h'}`);
    });
  }
}

export default AuthApp;
