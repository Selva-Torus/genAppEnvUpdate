import { BadRequestException, Body, Controller, Headers,  Logger,Post,UsePipes,ValidationPipe,} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeService } from './te.service';
import { CommonService } from 'src/common.Service';
import { pfDto, teSaveDto } from 'src/dto';
import { LockService } from 'src/lock.service';
import { CustomException } from 'src/customException';
import { RedisService } from 'src/redisService';
import { ListenerService } from './listener.service';



@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('Torus API')
@Controller('te')
export class TeController {
  constructor (private readonly teService:TeService,private readonly apiService:CommonService,
    private readonly lockservice:LockService,
    private readonly redisService:RedisService,private readonly listenerService:ListenerService,   
  ){}
  private readonly logger = new Logger(TeController.name);

  @Post('eventEmitter')
   async pfEventEmitter(@Body() pfdto: pfDto, @Headers('Authorization') auth: any): Promise<any> {
    pfdto.token = auth.split(' ')[1];
    const { dpdKey, method } = pfdto
    const client = process.env.CLIENTCODE;
    const currentFabric = await this.apiService.splitcommonkey(pfdto.key, 'FNK')

    if (currentFabric == 'DF-DFD') {
      const result: any = await this.teService.EventEmitter(pfdto);
      if (dpdKey && method) {
        result["dpdKey"] = dpdKey
        result["method"] = method
      }
      return result;
    }

    // Fetch flowSummary once
    const flowSummary = JSON.parse(await this.redisService.getJsonData(pfdto.key + 'PFS', client))
    let TimeInterval, milliseconds

    // Parallel processing of scheduler and interval nodes
    if (flowSummary?.length > 0) {
      const schedulerNodes = flowSummary.filter(f => f.nodeType == 'schedulernode' && currentFabric == 'PF-SCDL');
      const intervalNodes = flowSummary.filter(f => f.nodeType == 'intervalnode' && currentFabric == 'PF-SCDL');

      // Parallel fetch of scheduler nodes
      if (schedulerNodes.length > 0) {
        const schedulerPromises = schedulerNodes.map(node =>
          this.redisService.getJsonDataWithPath(pfdto.key + 'NDP', '.' + node.nodeId, client)
        );
        const schedulerResults = await Promise.all(schedulerPromises);

        for (const result of schedulerResults) {
          if (result) {
            const schedulerNode = JSON.parse(result);
            const schInterval = schedulerNode?.data?.pro?.value?.schedulerInfo?.value?.interval;
            if (schInterval) {
              TimeInterval = `${schInterval?.seconds?.value} ${schInterval.minutes?.value} ${schInterval.hours?.value} ${schInterval.dayOfmonth?.value} ${schInterval.months?.value} ${schInterval.dayOfweek?.value}`;
              break; // Take first valid interval
            }
          }
        }
      }

      // Parallel fetch of interval nodes
      if (intervalNodes.length > 0 && !TimeInterval) {
        const intervalPromises = intervalNodes.map(node =>
          this.redisService.getJsonDataWithPath(pfdto.key + 'NDP', '.' + node.nodeId, client)
        );
        const intervalResults = await Promise.all(intervalPromises);

        for (const result of intervalResults) {
          if (result) {
            const schedulerNode = JSON.parse(result);
            milliseconds = schedulerNode?.data?.pro?.milliseconds?.value;
            if (milliseconds) break; // Take first valid milliseconds
          }
        }
      }
    }

    // Extract jobname once (reused for both TimeInterval and milliseconds)
    const keyname = pfdto?.key.split(':');
    const jobname = ((keyname[1] + keyname[5] + keyname[7] + keyname[9] + keyname[11] + keyname[13]).replace(/[-_]/g, '')).replace(/\s+/g, '');

    // Handle TimeInterval
    if (TimeInterval) {
      if (pfdto.schedulerStatus == 'active') {
        await this.listenerService.startCronJob(jobname, TimeInterval, pfdto, client, pfdto.token);
        return 'scheduler started';
      } else if (pfdto.schedulerStatus == 'inactive') {
        await this.listenerService.stopCron(jobname);
        return 'scheduler stopped';
      }
    }

    // Handle milliseconds interval
    if (milliseconds) {
      if (pfdto.schedulerStatus == 'active') {
        return await this.listenerService.startInterval(jobname, milliseconds, pfdto, client, pfdto.token);
      } else if (pfdto.schedulerStatus == 'inactive') {
        return await this.listenerService.stopIntervalJob(jobname);
      }
    }

    // Handle regular event emission
      if (!pfdto.upId) {
      let result:any,resArr = []
      if(Array.isArray(pfdto.data) && pfdto.data.length>0){      
        if(pfdto.data.length == 1){
          pfdto.data = pfdto.data[0]
        result = await this.teService.EventEmitter(pfdto);
        }else{
           for(let item of pfdto.data){
          pfdto.data = item
         result = await this.teService.EventEmitter(pfdto);        
         if(Array.isArray(result?.data))
          resArr.push(...result?.data)
         else
          resArr.push(result?.data)
       }
       result['data'] = resArr
        }      
      }else
       result = await this.teService.EventEmitter(pfdto);
      if (dpdKey && method) {
        result["dpdKey"] = dpdKey
        result["method"] = method
      }
      return result;
    }

    // Handle multiple upIds - PARALLEL PROCESSING
    //if (pfdto.upId && pfdto.upId.length == 0) {
      //throw new CustomException('Process Id is empty', 400)
    //}

    const { upId: refupid, key, nodeId, nodeName, nodeType: nodetype, data, event, sourceId } = pfdto;

    if (!refupid?.length || !data?.length) {
      throw new CustomException('Invalid payload', 422)
    }

    // Process all events in parallel
    const eventPromises = refupid.map((upId, k) =>
      this.teService.EventEmitter({
        ...pfdto,
        upId,
        key,
        nodeId,
        nodeName,
        nodeType: nodetype,
        data: data[k],
        event,
        sourceId
      })
    );

    const results = await Promise.all(eventPromises);
    const lastResult = results[results.length - 1];

    let finalres
    if(lastResult?.node == 'outputnode'){
       finalres = {
      upId: results.map(res => res?.upId).filter(Boolean),
      message: lastResult?.message,
      event: lastResult?.event,
      data:lastResult?.data
    }
    }else{
      finalres = {
      upId: results.map(res => res?.upId).filter(Boolean),
      message: lastResult?.message,
      event: lastResult?.event,     
    }
    }

    if (dpdKey && method) {
      finalres["dpdKey"] = dpdKey
      finalres["method"] = method
    }

    return finalres;
  }

   
      
  @Post('save')
  async save(@Body() input: teSaveDto, @Headers('Authorization') auth: any): Promise<any> {
    var token = auth.split(' ')[1];   
    const { dpdKey,method } = input  
      
      if (input.data){
        let result :any = await this.teService.savehandler(input,token)
        if(dpdKey && method){
          result["dpdKey"] = dpdKey
          result["method"] = method
        }
        return result
      }else{
        return 'data is required'
      }
  } 
  
}


