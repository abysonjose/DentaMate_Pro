import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import logger from './utils/logger';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

class GatewayApp {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security middleware
    if (process.env.HELMET_ENABLED !== 'false') {
      this.app.use(helmet());
    }

    // CORS configuration
    const corsOptions = {
      origin: process.env.CORS_ORIGIN?.split(',') || '*',
      credentials: true,
      optionsSuccessStatus: 200
    };
    this.app.use(cors(corsOptions));

    // Compression middleware
    if (process.env.COMPRESSION_ENABLED !== 'false') {
      this.app.use(compression());
    }

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Request logging
    this.app.use(morgan('combined', {
      stream: {
        write: (message: string) => logger.info(message.trim())
      }
    }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: config.rateLimit.windowMs,
      max: config.rateLimit.max,
      message: {
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests, please try again later'
        },
        timestamp: new Date().toISOString()
      },
      standardHeaders: true,
      legacyHeaders: false
    });
    this.app.use('/api/', limiter);

    // Request ID middleware
    this.app.use((req: Request, res: Response, next) => {
      const requestId = req.headers['x-request-id'] || `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      res.setHeader('X-Request-ID', requestId);
      next();
    });
  }

  private initializeRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (_req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: 'API Gateway is healthy',
        data: {
          service: 'dentamate-api-gateway',
          version: '1.0.0',
          uptime: process.uptime(),
          timestamp: new Date().toISOString(),
          environment: config.env
        }
      });
    });

    // API version info
    this.app.get('/api/v1', (_req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: 'DentaMate API Gateway v1',
        data: {
          version: '1.0.0',
          services: {
            auth: config.services.auth,
            user: config.services.user,
            clinic: config.services.clinic,
            appointment: config.services.appointment,
            billing: config.services.billing,
            notification: config.services.notification,
            aiDiagnosis: config.services.aiDiagnosis,
            prescriptionOcr: config.services.prescriptionOcr,
            analytics: config.services.analytics
          }
        },
        timestamp: new Date().toISOString()
      });
    });

    // Mount all API routes
    this.app.use(routes);
  }

  private initializeErrorHandling(): void {
    // 404 handler
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }

  public listen(): void {
    this.app.listen(config.port, () => {
      logger.info(`🚀 DentaMate API Gateway started on port ${config.port}`);
      logger.info(`📝 Environment: ${config.env}`);
      logger.info(`🔐 Security: Helmet ${process.env.HELMET_ENABLED !== 'false' ? 'enabled' : 'disabled'}`);
      logger.info(`📦 Compression: ${process.env.COMPRESSION_ENABLED !== 'false' ? 'enabled' : 'disabled'}`);
      logger.info(`⚡ Rate limiting: ${config.rateLimit.max} requests per ${config.rateLimit.windowMs}ms`);
      logger.info(`🌐 Services configured: ${Object.keys(config.services).length}`);
    });
  }
}

export default GatewayApp;
