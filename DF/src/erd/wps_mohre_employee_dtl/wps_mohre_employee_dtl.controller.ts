

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { wps_mohre_employee_dtlService } from './wps_mohre_employee_dtl.service';
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
import { wps_mohre_employee_dtlEntity } from './entity/wps_mohre_employee_dtl.entity';
//import { CreateWpsMohreEmployeeDtlDto } from '../prisma/dto/create-wpsMohreEmployeeDtl.dto';
//import { UpdateWpsMohreEmployeeDtlDto } from '../prisma/dto/update-wpsMohreEmployeeDtl.dto';
import { Createwps_mohre_employee_dtlDto } from './dto/Createwps_mohre_employee_dtl.dto';
import { Updatewps_mohre_employee_dtlDto } from './dto/Updatewps_mohre_employee_dtl.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';

 
@Controller('wps_mohre_employee_dtl')
@ApiTags('ERD API')
export class wps_mohre_employee_dtlController {
  constructor(
    private readonly wps_mohre_employee_dtlService: wps_mohre_employee_dtlService,
    private readonly ufservice: UfService
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the wps_mohre_employee_dtl table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.wps_mohre_employee_dtlService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the wps_mohre_employee_dtl table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.wps_mohre_employee_dtlService.findAllmethod(query, +limit,selectColumns,token);
  }

  @Get(':wpsmed_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'wpsmed_id',type:Number})
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the wps_mohre_employee_dtl table',
  })
  
  async findOne(@Headers() authHeader: string,@Param('wpsmed_id') wpsmed_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.wps_mohre_employee_dtlService.findOne(+wpsmed_id,token);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
  }
 
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the wps_mohre_employee_dtl table',
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
    const result = await this.wps_mohre_employee_dtlService.findAll(token,);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('wps_mohre_employee_dtl'))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiBody({ type: Createwps_mohre_employee_dtlDto })
  @ApiCreatedResponse({ type: wps_mohre_employee_dtlEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the wps_mohre_employee_dtl table',
  })
  
  async create(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createwps_mohre_employee_dtlDto: Prisma.wps_mohre_employee_dtlCreateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use createMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks, approvalStatus: mcApprovalStatus,approvalId:mcApprovalID };
      const result = await this.wps_mohre_employee_dtlService.createMaster(createwps_mohre_employee_dtlDto, makerInfo, token);
      return result;
    }

    const result = this.wps_mohre_employee_dtlService.create(createwps_mohre_employee_dtlDto,token);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
  }
 
  @Patch(':wpsmed_id')
  @UsePipes(new PrismaModelValidationPipe('wps_mohre_employee_dtl', true))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'wpsmed_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiBody({ type: Updatewps_mohre_employee_dtlDto })
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the wps_mohre_employee_dtl table',
  })
    
  async update(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('wpsmed_id') wpsmed_id:number,
    @Body() updatewps_mohre_employee_dtlDto: Prisma.wps_mohre_employee_dtlUpdateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use updateMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks,approvalStatus: mcApprovalStatus };
      const result = await this.wps_mohre_employee_dtlService.updateMaster(+wpsmed_id,updatewps_mohre_employee_dtlDto,makerInfo,token);
      return result;
    }

    const result = await this.wps_mohre_employee_dtlService.update(+wpsmed_id,updatewps_mohre_employee_dtlDto,token);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
  }
 
  @Delete(':wpsmed_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'wpsmed_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the wps_mohre_employee_dtl table',
  })
  
  async remove(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('wpsmed_id') wpsmed_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use deleteMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks,approvalStatus: mcApprovalStatus };
      const result = await this.wps_mohre_employee_dtlService.deleteMaster(+wpsmed_id,makerInfo,token);
      return result;
    }

    const result = await this.wps_mohre_employee_dtlService.remove(+wpsmed_id,token);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the wps_mohre_employee_dtl table',
  })
  
  async findFirst(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.wps_mohre_employee_dtlService.findFirst(token);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the wps_mohre_employee_dtl table',
  })
  
  async findLast(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.wps_mohre_employee_dtlService.findLast(token);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
  }
}