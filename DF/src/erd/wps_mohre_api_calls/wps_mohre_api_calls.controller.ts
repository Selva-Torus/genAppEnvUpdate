

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { wps_mohre_api_callsService } from './wps_mohre_api_calls.service';
import { Prisma } from '@prisma/client';
import { ApiOkResponse, ApiTags,ApiOperation,ApiBody,
  ApiQuery,ApiParam,
  ApiBadRequestResponse,ApiUnauthorizedResponse,
  ApiForbiddenResponse,ApiNotAcceptableResponse,
  ApiConflictResponse,ApiNotFoundResponse,
  ApiMethodNotAllowedResponse,
  ApiRequestTimeoutResponse,
  ApiGoneResponse,
  ApiUnsupportedMediaTypeResponse,
  ApiUnprocessableEntityResponse,
  ApiInternalServerErrorResponse,
  ApiNotImplementedResponse,
  ApiBadGatewayResponse,
  ApiServiceUnavailableResponse,
  ApiGatewayTimeoutResponse,
  ApiBearerAuth ,
  ApiCreatedResponse,
  ApiHeader
} from '@nestjs/swagger';
import { wps_mohre_api_callsEntity } from './entity/wps_mohre_api_calls.entity';
//import { CreateWpsMohreApiCallsDto } from '../prisma/dto/create-wpsMohreApiCalls.dto';
//import { UpdateWpsMohreApiCallsDto } from '../prisma/dto/update-wpsMohreApiCalls.dto';
import { Createwps_mohre_api_callsDto } from './dto/Createwps_mohre_api_calls.dto';
import { Updatewps_mohre_api_callsDto } from './dto/Updatewps_mohre_api_calls.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';

 
@Controller('wps_mohre_api_calls')
@ApiTags('ERD API')
export class wps_mohre_api_callsController {
  constructor(
    private readonly wps_mohre_api_callsService: wps_mohre_api_callsService,
    private readonly ufservice: UfService
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: wps_mohre_api_callsEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the wps_mohre_api_calls table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.wps_mohre_api_callsService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: wps_mohre_api_callsEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the wps_mohre_api_calls table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.wps_mohre_api_callsService.findAllmethod(query, +limit,selectColumns,token);
  }

  @Get(':wpsm_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'wpsm_id',type:Number})
  @ApiOkResponse({ type: wps_mohre_api_callsEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the wps_mohre_api_calls table',
  })
  
  async findOne(@Headers() authHeader: string,@Param('wpsm_id') wpsm_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.wps_mohre_api_callsService.findOne(+wpsm_id,token);
    return plainToInstance(wps_mohre_api_callsEntity, result);
  }
 
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: wps_mohre_api_callsEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the wps_mohre_api_calls table',
  })
  
  async findAll(@Headers() authHeader: string,@Req() req: any,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    let presentQueryKeys:any=[
    ]
    let comingQueryKeys:any=Object.keys(query)||[]
    let isComingQuerysAreValid=true;
    if(comingQueryKeys.length==0)
      {
        isComingQuerysAreValid = true;
      }
  
      // If arrays have different lengths, they cannot be equal
      if (comingQueryKeys.length > presentQueryKeys.length) {
        isComingQuerysAreValid= false;
      }
      // Compare each element after sorting
      for (let i = 0; i < comingQueryKeys.length; i++) {
        if (!presentQueryKeys.includes(comingQueryKeys[i])) {
          isComingQuerysAreValid=false;
        }
      }
    if (req.originalUrl.includes('?') && req.originalUrl.split('?')[1].includes('/') || isComingQuerysAreValid==false) {
      throw new NotFoundException('Invalid query parameter structure.');
    }
    const result = await this.wps_mohre_api_callsService.findAll(token,);
    return plainToInstance(wps_mohre_api_callsEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('wps_mohre_api_calls'))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiBody({ type: Createwps_mohre_api_callsDto })
  @ApiCreatedResponse({ type: wps_mohre_api_callsEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the wps_mohre_api_calls table',
  })
  
  async create(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createwps_mohre_api_callsDto: Prisma.wps_mohre_api_callsCreateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use createMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks, approvalStatus: mcApprovalStatus,approvalId:mcApprovalID };
      const result = await this.wps_mohre_api_callsService.createMaster(createwps_mohre_api_callsDto, makerInfo, token);
      return result;
    }

    const result = this.wps_mohre_api_callsService.create(createwps_mohre_api_callsDto,token);
    return plainToInstance(wps_mohre_api_callsEntity, result);
  }
 
  @Patch(':wpsm_id')
  @UsePipes(new PrismaModelValidationPipe('wps_mohre_api_calls', true))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'wpsm_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiBody({ type: Updatewps_mohre_api_callsDto })
  @ApiOkResponse({ type: wps_mohre_api_callsEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the wps_mohre_api_calls table',
  })
    
  async update(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('wpsm_id') wpsm_id:number,
    @Body() updatewps_mohre_api_callsDto: Prisma.wps_mohre_api_callsUpdateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use updateMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks,approvalStatus: mcApprovalStatus };
      const result = await this.wps_mohre_api_callsService.updateMaster(+wpsm_id,updatewps_mohre_api_callsDto,makerInfo,token);
      return result;
    }

    const result = await this.wps_mohre_api_callsService.update(+wpsm_id,updatewps_mohre_api_callsDto,token);
    return plainToInstance(wps_mohre_api_callsEntity, result);
  }
 
  @Delete(':wpsm_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'wpsm_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiOkResponse({ type: wps_mohre_api_callsEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the wps_mohre_api_calls table',
  })
  
  async remove(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('wpsm_id') wpsm_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use deleteMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks,approvalStatus: mcApprovalStatus };
      const result = await this.wps_mohre_api_callsService.deleteMaster(+wpsm_id,makerInfo,token);
      return result;
    }

    const result = await this.wps_mohre_api_callsService.remove(+wpsm_id,token);
    return plainToInstance(wps_mohre_api_callsEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: wps_mohre_api_callsEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the wps_mohre_api_calls table',
  })
  
  async findFirst(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.wps_mohre_api_callsService.findFirst(token);
    return plainToInstance(wps_mohre_api_callsEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: wps_mohre_api_callsEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the wps_mohre_api_calls table',
  })
  
  async findLast(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.wps_mohre_api_callsService.findLast(token);
    return plainToInstance(wps_mohre_api_callsEntity, result);
  }
}