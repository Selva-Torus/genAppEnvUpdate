
/* {
  "aKey": "CK:TGA:FNGK:BLDC:FNK:DEV:CATK:CT003:AFGK:AG001:AFK:A001:AFVK:v1:bldc",
  "deploymentArtifactKey": "CK:CT003:FNGK:AF:FNK:CDF-DPD:CATK:AG001:AFGK:A001:AFK:defaultDPD:AFVK:v1",
  "appGroupDesc": "appgroup",
  "logType": "mongodb",
  "appDesc": "Reimfast",
  "isOld": true,
  "clientCode": "CT007",
  "loginDetails": {
    "firstName": "Vicky",
    "lastName": "G",
    "loginId": "Vicky",
    "email": "ganapathyg@torus.tech",
    "mobile": "",
    "status": "active",
    "accessProfile": [
      "Developer"
    ],
    "accessExpires": "",
    "dateAdded": "2026-02-04T06:52:59.543Z",
    "profile": "",
    "userUniqueId": "b47321de-a615-4d79-83f1-a5abfcaba65d",
    "touring": {
      "isneedTouring": false,
      "touringData": {
        "/torus": {
          "stepIndex": 0,
          "isSkipped": false,
          "completed": false,
          "notVisited": []
        },
        "/control-center/company-profile": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/control-center/account-profile": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/home": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "artifactselector": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        },
        "/logic-center": {
          "stepIndex": 0,
          "isSkipped": true,
          "completed": false,
          "notVisited": []
        }
      }
    },
    "users": "VickyVicky G",
    "noOfProductsService": 0,
    "edit": "",
    "lastActive": "2026-02-09T11:07:41.203Z",
    "client": "CT007"
  }
} */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import authPlugin from './auth.middleware';
import { CommonService } from './common.Service';
import * as fs from 'fs';
import DecryptPayloadMiddleware from './decryptPayloadMiddleware';
import multipart from '@fastify/multipart';
import { BigIntInterceptor } from './bigint.interceptor';
;
import { EnvData } from './envData/EnvData.service';
import { Logger } from '@nestjs/common';
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
    const redisResult = await redis.call('JSON.GET', "CK:CT003:FNGK:AF:FNK:CDF-DPD:CATK:AG001:AFGK:A001:AFK:defaultDPD:AFVK:v1:NDS");
    if (redisResult) {
      const parsed = typeof redisResult === 'string' ? JSON.parse(redisResult) : redisResult;
      const source = Array.isArray(parsed) ? parsed[0] : parsed;
      configData = source?.data?.nodeProperty?.data;

      if (configData) {
        logger.log('✅ Config fetched from Redis');
      } else {
        logger.warn('⚠️ Config structure Redis - No DPD data found');
      }
    } else {
      logger.warn('⚠️ No config found in Redis for key');
    }
  } catch (error) {
    logger.error('Error loading config from Redis:', error);
  }

  const fastifyAdapter = new FastifyAdapter({
    bodyLimit: 500 * 1024 * 1024, // 500MB limit
    logger: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  const envData = app.get(EnvData);
  if (configData) {
    envData.setConfig(configData);
    console.log('✅ Config loaded into EndDetails at bootstrap');
  } else {
    console.error('❌ No config data to load into EndDetails');
  }
    // Global interceptor for BigInt serialization
  app.useGlobalInterceptors(new BigIntInterceptor());
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
  //await fastifyInstance.register(authPlugin(commonService), { prefix: '/te' });
  await fastifyInstance.register(DecryptPayloadMiddleware(commonService));
   // Register the core Fastify multipart plugin
  fastifyInstance.register(multipart as any);    
  //CORS
  app.enableCors({methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']});

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
    .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 
    'JWT-auth',
    )
    .addServer('https://tgadev.toruslowcode.com/ct003/ag001/a001/v1/api','Production Server')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('docs', app, document);

  //helmet
  await app.register(helmet,{
  contentSecurityPolicy: false,
  global: true, 
  });

  // Start Fastify app
  await app.listen(process.env.APP_PORT,"0.0.0.0");
}
bootstrap();
