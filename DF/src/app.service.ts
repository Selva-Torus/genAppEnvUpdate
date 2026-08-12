


import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import { UfService } from './Torus/v1/uf/uf.service';
import { CommonService } from './common.Service';
import { CdcPrismaService } from './erd/cdc_prisma.service';
import { SwaggerGuard } from './swagger.guard';
@Injectable()
export class AppService implements OnModuleInit{
  private readonly apiUrl = process.env.API_URL;
  private readonly clientcode = process.env.CLIENTCODE;
  private readonly loginId = process.env.LOGINID;
  constructor(private readonly ufservice: UfService,
  private readonly swaggerGuard: SwaggerGuard,
  private readonly commonService: CommonService,
  private readonly triggerSqlQueries:CdcPrismaService
  ) {}

  async onModuleInit() {
    console.info('Starting Swagger upload to API Fabric...');
    if (!fs.existsSync('./swagger.json')) {
      console.warn('swagger.json not found at project root — skipping Swagger upload to API Fabric.');
      return;
    }
    let preParedData:any=await this.dataPrep(JSON.parse(fs.readFileSync('./swagger.json', 'utf-8')))
    await this.triggerFuntionExecute()
    if(Object.keys(preParedData).includes('erdWithData'))
      {
      let endPointData : any = {};
      let erdDatas: any = {};
      endPointData.data = preParedData?.erdWithData||{}
      endPointData.type =  "json";
      let res =  await this.ufservice.getEndPoints(endPointData);
      erdDatas.endpoint = res;
      erdDatas.tenant =  "CT006";
      erdDatas.domain = "Legal Automation Platform";
      erdDatas.collection = "LAP";
      erdDatas.data = preParedData?.erdWithData||{}
      erdDatas.fabric = 'API-APIPD';
      erdDatas.loginId = this.loginId;
      erdDatas.erdFlag = true;

      if (!this.swaggerGuard.canActivate()) {
        return;
      }

      await this.ufservice.createApiCollection(erdDatas,this.clientcode);
      console.info('Swagger upload to API Fabric completed successfully.');
      }
  }
  async triggerFuntionExecute(isLocal:string='prod'){
    const migrationsDir = isLocal === 'dev'
      ? './src/erd/prisma/migrations'
      : './dist/prisma/migrations';
       const migrationsFile = `${migrationsDir}/triggerFuctions.sql`;
    if (!fs.existsSync(migrationsFile)) {
      console.warn(`${migrationsFile} not found — skipping trigger function execution.`);
      return;
    }
    let migrationSql_trigger = await fs.readFileSync(migrationsFile, 'utf-8'); 
    await this.triggerSqlQueries.$executeRawUnsafe(migrationSql_trigger);
    console.info('trigger queries executed');
  }

  getHello(): string {
    return 'Hello World!';
  }
  
  dataPrep(allBody: any) {
    let appPaths: any = Object.keys(allBody?.paths);
    let erdWithData: any = structuredClone(allBody);
    let torusApis: any = structuredClone(allBody);

    erdWithData['paths'] = {};
    torusApis['paths'] = {};

    let onlyErdKeys = [];
    appPaths.map((keys:any) => {
      if (
        !keys.startsWith('/te/') &&
        !keys.startsWith('/UF/') &&
        !keys.startsWith('/expLog') &&
        !keys.startsWith('/prcLog') &&
        keys != '/'
      ) {
        onlyErdKeys.push(keys);
        erdWithData.paths[keys] = {};
      } else {
        torusApis.paths[keys] = allBody.paths[keys];
      }
    });
    onlyErdKeys.map((key:any) => {
      erdWithData.paths[key] = allBody.paths[key];
    });
    return {
      erdWithData,
      torusApis,
    };
  }
}
