import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import { CommonService } from './common.Service';
import * as fs from 'fs';
import DecryptPayloadMiddleware from './decryptPayloadMiddleware';
import multipart from '@fastify/multipart';
import { BigIntInterceptor } from './bigint.interceptor';
import { EnvData } from './envData/envData.service';
//import { envData as mongoClientEnvData } from './mongoClient';
import { decrypt } from './decrypt';
import { Logger, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const Redis = require('ioredis');

async function bootstrap() {
  const logger = new Logger('Redis');
  const redis = new Redis({
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
  }).on('error', (err:any) => {
    console.log('Redis Client Error', err);
    throw err;
  });

  let configData = null;
  try {
    const redisResult = await redis.call('JSON.GET', "CK:CT006:FNGK:AF:FNK:CDF-DPD:CATK:LAP:AFGK:LAP:AFK:lapDPD:AFVK:v1:NDP");
    if (redisResult) {
      const parsed = JSON.parse(redisResult);
      const rootKey = Object.keys(parsed)[0];
      const encryptedPayload = parsed[rootKey];
      const decryptedData = decrypt<{ data: any }>(encryptedPayload);
      configData = decryptedData.data;

      if (configData) {
        logger.log('✅ Config fetched from Redis');
      } else {
        throw new Error('Config structure Redis - No DPD data found');
      }
    } else {
      logger.warn('⚠️ No config found in Redis for key');
    }
  } catch (error) {
    logger.error('Error loading config from Redis:', error);
  }

   //if (configData) {
   // mongoClientEnvData.setConfig(configData);
 // }

  const fastifyAdapter = new FastifyAdapter({
    bodyLimit: 500 * 1024 * 1024, // 500MB limit
    logger: true,
  });
  if (configData) {
    EnvData.preloadConfig(configData);
    logger.log('✅ Config preloaded into EnvData before bootstrap');
  }
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  const envData = app.get(EnvData);

  if (!configData) {
    console.error('❌EndDetails Not Initialized');
    throw new Error('DPD config data is required for application startup');
  }

  envData.setConfig(configData);
  console.log('✅ Config loaded into EndDetails');

    // Global interceptor for BigInt serialization
  app.useGlobalInterceptors(new BigIntInterceptor());
  // Global validation for any @Body()/@Param()/@Query() typed with a DTO class.
  // transform:true applies existing class-validator decorators (e.g. @IsNotEmpty on
  // OrchestrationDto.key) app-wide instead of only on the ERD controllers.
  // NOTE: whitelist/forbidNonWhitelisted are intentionally omitted — several DTOs in
  // dto.ts (OrchestrationDto, setUpKeyDto, etc.) have undecorated fields (dpdKey, method,
  // componentId...) that whitelist mode would silently strip. Add those once DTOs are
  // fully decorated.
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //app.use(
    //session({
      //secret: 'Torus9x',
      //resave: false,
      //saveUninitialized: false,
    //}),
  //);
  
  //Middleware applied
  const fastifyInstance = fastifyAdapter.getInstance();
  const commonService = app.get(CommonService);
  // Authentication is now enforced globally via APP_GUARD (auth.guard.ts,
  // see app.module.ts) instead of a Fastify plugin registered here.
  await fastifyInstance.register(DecryptPayloadMiddleware(commonService));
   // Register the core Fastify multipart plugin
   fastifyInstance.register(multipart as any);
  // CORS — restricted to an operator-configured allowlist instead of the
  // previous unrestricted default. Set CORS_ALLOWED_ORIGINS (comma-separated)
  // to the real front-end origin(s) before deploying; with it unset, all
  // cross-origin requests are rejected (fail closed).
  const corsAllowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);
  app.enableCors({
    origin: corsAllowedOrigins.length > 0 ? corsAllowedOrigins : false,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  });

  // Microservice setup (TCP transport)
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: process.env.PO_PORT,
    },
  });
  await app.startAllMicroservices();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('The Nestjs API documentation')
    .setVersion('0.1')
    .addTag('ERD API')
    .addTag('Torus API')
    .addTag('Scheduler API')
    .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 
    'JWT-auth',
    )
    .addServer('https://tgaprod910.toruslowcode.com/ct006/lap/lap/v1/api','Production Server')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
    // Swagger UI/JSON was previously mounted with no guard in front of it —
  // require the same bearer token AuthGuard checks before serving /docs.
  const swaggerJwtService = app.get(JwtService);
  const swaggerEnvData = app.get(EnvData);
  fastifyInstance.addHook('onRequest', async (request, reply) => {
    if (!request.url.includes('/docs')) return;
    const authHeader = request.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
      reply.code(401).send({ message: 'Authorization header is missing' });
      return;
    }
    try {
      swaggerJwtService.verify(token, { secret: swaggerEnvData.getAuthSecret() });
    } catch (e) {
      reply.code(401).send({ message: 'Invalid or expired token' });
    }
  });

  SwaggerModule.setup('docs', app, document);

  //helmet
  await app.register(helmet,{
  // CSP now enabled (was explicitly disabled) — directives kept permissive
  // enough for Swagger UI's inline bootstrap script/styles, per Nest's own
  // Helmet+Swagger guidance, rather than turning CSP off app-wide for it.
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [`'self'`],
      scriptSrc: [`'self'`, `'unsafe-inline'`],
      styleSrc: [`'self'`, `'unsafe-inline'`],
      imgSrc: [`'self'`, 'data:'],
    },
  },
  global: true,
  });

  // Start Fastify app
  await app.listen(process.env.APP_PORT,"0.0.0.0");
}
bootstrap();
