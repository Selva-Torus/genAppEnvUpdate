
/* {
  "aKey": "CK:TGA:FNGK:BLDC:FNK:DEV:CATK:CT005:AFGK:GSS:AFK:VGPH:AFVK:v1:bldc",
  "deploymentArtifactKey": "CK:CT005:FNGK:AF:FNK:CDF-DPD:CATK:GSS:AFGK:VGPH:AFK:VGPH_DPD:AFVK:v1",
  "appGroupDesc": "GSS",
  "logType": "dfs",
  "appDesc": "VGPH",
  "appLogo": "torus/9.1/CT005/resources/images/White global payment hub.png",
  "isOld": true,
  "clientCode": "CT005",
  "loginDetails": {
    "edit": "",
    "email": "dominica@gsstvl.com",
    "users": "DominicDominic A",
    "client": "CT005",
    "mobile": "",
    "status": "active",
    "loginId": "Dominic",
    "profile": "",
    "touring": {
      "touringData": {
        "/home": {
          "completed": false,
          "isSkipped": true,
          "stepIndex": 1,
          "notVisited": []
        },
        "/torus": {
          "completed": false,
          "isSkipped": true,
          "stepIndex": 0,
          "notVisited": []
        },
        "/logic-center": {
          "completed": false,
          "isSkipped": true,
          "stepIndex": 0,
          "notVisited": []
        },
        "artifactselector": {
          "completed": false,
          "isSkipped": true,
          "stepIndex": 0,
          "notVisited": []
        }
      },
      "isneedTouring": false
    },
    "lastName": "A",
    "dateAdded": "2026-04-08T08:02:02.245Z",
    "firstName": "Dominic",
    "lastActive": "2026-07-02T07:35:06.437Z",
    "userUniqueId": "cc1efc49-5291-4f48-a7cc-92a89d876e7e",
    "accessExpires": "2028-06-23",
    "accessProfile": [
      "Dev Team"
    ],
    "noOfProductsService": 0
  },
  "setupData": {
    "appInfo": {
      "code": "VGPH",
      "logo": "torus/9.1/CT005/resources/images/Blue Logo.png",
      "name": "VGPH",
      "appLogo": "torus/9.1/CT005/resources/images/White global payment hub.png",
      "accessUrl": "https://tgadev2.toruslowcode.com/ct005/gss/vgph/v1",
      "appGrpCode": "GSS",
      "appGrpName": "GSS",
      "encryption": {
        "type": ""
      },
      "lastBuildOn": "2026-06-03T09:34:32.415Z",
      "lastBuildVersion": "v1",
      "applicationUniqueId": "ae093d5d-f44a-444b-afab-9476f31e7dca",
      "deploymentArtifactKey": "CK:CT005:FNGK:AF:FNK:CDF-DPD:CATK:GSS:AFGK:VGPH:AFK:VGPH_DPD:AFVK:v1",
      "fusionAuthAppClientSecret": "AKE3Mkrdhezw9vln9mTV-Wnb8WVEivZ3BY0KTxqtmbc"
    },
    "selectedPresetKey": "default",
    "tenantAppearancekey": "CK:TGA:FNGK:SETUP:FNK:SF:CATK:TENANT:AFGK:CT005:AFK:PROFILE:AFVK:v1:appearance",
    "name": "default",
    "theme": "light",
    "fontSize": {
      "maxPx": "12",
      "minPx": "6",
      "preferredVw": "0.85"
    },
    "language": "English",
    "direction": "LTR",
    "brandColor": "#0737c9",
    "fontFamily": [
      {
        "label": "Inter",
        "fontUrl": "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&d…"
      }
    ],
    "hoverColor": "#d5eeff",
    "layoutMode": "detached",
    "borderRadius": "m",
    "sidebarStyle": "",
    "selectionColor": "#579eff",
    "text-body-font": "Inter",
    "mobileAppearance": {
      "theme": "light",
      "fontSize": {
        "bodyLarge": "16",
        "bodySmall": "12",
        "bodyMedium": "14",
        "labelLarge": "16",
        "labelSmall": "12",
        "titleLarge": "20",
        "titleSmall": "16",
        "labelMedium": "14",
        "titleMedium": "18",
        "displayLarge": "64",
        "displaySmall": "36",
        "displayMedium": "44",
        "headlineLarge": "32",
        "headlineSmall": "24",
        "headlineMedium": "28"
      },
      "language": "English",
      "direction": "LTR",
      "fontFamily": "Roboto",
      "brandColors": {
        "primary": "#0025dd",
        "tertiary": "#000000",
        "secondary": "#000e51"
      },
      "drawerStyle": "",
      "accentColors": {
        "accentOne": "#f4f5ff",
        "accentTwo": "#ffffff"
      },
      "utilityColors": {
        "darkMode": {
          "primaryText": "#ffffff",
          "secondaryText": "#95a1ac",
          "primaryBackground": "#1d2428",
          "secondaryBackground": "#14181b"
        },
        "lightMode": {
          "primaryText": "#14181b",
          "secondaryText": "#57636c",
          "primaryBackground": "#f1f4f8",
          "secondaryBackground": "#ffffff"
        }
      },
      "navigationStyle": "Bottom Navigation"
    },
    "navigationStyles": "horizontal",
    "text-header-font": "Inter",
    "text-display-font": "Inter",
    "appBackgroundImage": "torus/9.1/CT005/resources/images/Home.png"
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
import { EnvData } from './envData/envData.service';
//import { envData as mongoClientEnvData } from './mongoClient';
import { decrypt } from './decrypt';
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
    const redisResult = await redis.call('JSON.GET', "CK:CT005:FNGK:AF:FNK:CDF-DPD:CATK:GSS:AFGK:VGPH:AFK:VGPH_DPD:AFVK:v1:NDP");
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
    .addTag('Scheduler API')
    .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 
    'JWT-auth',
    )
    .addServer('https://tgaprod910.toruslowcode.com/ct005/gss/vgph/v1/api','Production Server')
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
