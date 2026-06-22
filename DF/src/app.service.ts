






import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import { UfService } from './Torus/v1/uf/uf.service';
import { CommonService } from './common.Service';

@Injectable()
export class AppService implements OnModuleInit{
  private readonly apiUrl = process.env.API_URL;
  private readonly clientcode = process.env.CLIENTCODE;
  constructor(private readonly ufservice: UfService,
  private readonly commonService: CommonService) {}

  async onModuleInit() {
    console.log('Application started, calling API...');
    console.log('DDL changes update started.');
    console.log('DDL changes update completed.');    
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiSGFyaXRoYSIsImNsaWVudCI6IkNUMDA2IiwidHlwZSI6ImMiLCJsb2dUeXBlIjoiZGZzIiwic2lkIjoiMzVkM2FjMzYtZGUyMS00NGYwLTg3MWUtN2IwN2Q5OGE2YWMzIiwiaWF0IjoxNzgyMTEzNTA0LCJleHAiOjE3ODIxMTQ3MDR9.Wo3PbZMYC3KKzavqJRwFJMN7-qFKsuMugkf2OGZ3-LU';
    let preParedData:any=await this.dataPrep(JSON.parse(fs.readFileSync('./swagger.json', 'utf-8')))
    if(Object.keys(preParedData).includes('erdWithData'))
      {
      let endPointData : any = {};
      let erdDatas: any = {};
      endPointData.data = preParedData?.erdWithData||{}
      endPointData.type =  "json";
      let res =  await this.ufservice.getEndPoints(endPointData);
      //let res =  await axios.post(this.apiUrl+'/getEndPoints', endPointData,{
      //  headers: {
      //    Authorization: `Bearer ${token}`, 
      //  }
      //});
      erdDatas.endpoint = res;
      erdDatas.tenant =  "CT006";
      erdDatas.domain = "Enterprise Compliance Portal";
      erdDatas.collection = "AMS";
      erdDatas.data = preParedData?.erdWithData||{}
      erdDatas.fabric = 'API-APIPD';
      erdDatas.loginId = "Haritha";    
      erdDatas.erdFlag = true;  
      await this.ufservice.createApiCollection(erdDatas,this.clientcode);
      //await axios.post(this.apiUrl+'/createApiCollection', erdDatas,{
      //  headers: {
      //    Authorization: `Bearer ${token}`, 
      //  }
      //});
      }
    if(Object.keys(preParedData).includes('torusApis'))
    {
      let torusData: any = {};
      //let endPointData : any = {};
      //endPointData.data = preParedData?.torusApis||{}
      //endPointData.type =  "json";
      //let res =  await axios.post(this.apiUrl+'/getEndPoints', endPointData);
      //torusData.endpoint = res.data;
      torusData.tenant =  "CT006";
      torusData.domain = "Enterprise Compliance Portal"; 
      torusData.collection = "AMS";
      torusData.fabric = 'API-APIPD-TORUS';
      torusData.data = preParedData?.torusApis||{}
      torusData.loginId = "Haritha";    
      //await axios.post(this.apiUrl, torusData);
    }
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
