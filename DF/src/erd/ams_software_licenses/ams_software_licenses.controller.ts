

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { ams_software_licensesService } from './ams_software_licenses.service';
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
import { ams_software_licensesEntity } from './entity/ams_software_licenses.entity';
//import { CreateAmsSoftwareLicensesDto } from '../prisma/dto/create-amsSoftwareLicenses.dto';
//import { UpdateAmsSoftwareLicensesDto } from '../prisma/dto/update-amsSoftwareLicenses.dto';
import { Createams_software_licensesDto } from './dto/Createams_software_licenses.dto';
import { Updateams_software_licensesDto } from './dto/Updateams_software_licenses.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';

 
@Controller('ams_software_licenses')
@ApiTags('ERD API')
export class ams_software_licensesController {
  constructor(
    private readonly ams_software_licensesService: ams_software_licensesService,
    private readonly ufservice: UfService
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ams_software_licensesEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the ams_software_licenses table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.ams_software_licensesService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ams_software_licensesEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the ams_software_licenses table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.ams_software_licensesService.findAllmethod(query, +limit,selectColumns,token);
  }

  @Get(':license_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'license_id',type:Number})
  @ApiOkResponse({ type: ams_software_licensesEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the ams_software_licenses table',
  })
  
  async findOne(@Headers() authHeader: string,@Param('license_id') license_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.ams_software_licensesService.findOne(+license_id,token);
    return plainToInstance(ams_software_licensesEntity, result);
  }
 
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ams_software_licensesEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the ams_software_licenses table',
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
    const result = await this.ams_software_licensesService.findAll(token,);
    return plainToInstance(ams_software_licensesEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('ams_software_licenses'))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiBody({ type: Createams_software_licensesDto })
  @ApiCreatedResponse({ type: ams_software_licensesEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the ams_software_licenses table',
  })
  
  async create(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createams_software_licensesDto: Prisma.ams_software_licensesCreateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use createMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks, approvalStatus: mcApprovalStatus,approvalId:mcApprovalID };
      const result = await this.ams_software_licensesService.createMaster(createams_software_licensesDto, makerInfo, token);
      return result;
    }

    const result = this.ams_software_licensesService.create(createams_software_licensesDto,token);
    return plainToInstance(ams_software_licensesEntity, result);
  }
 
  @Patch(':license_id')
  @UsePipes(new PrismaModelValidationPipe('ams_software_licenses', true))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'license_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiBody({ type: Updateams_software_licensesDto })
  @ApiOkResponse({ type: ams_software_licensesEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the ams_software_licenses table',
  })
    
  async update(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('license_id') license_id:number,
    @Body() updateams_software_licensesDto: Prisma.ams_software_licensesUpdateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use updateMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks,approvalStatus: mcApprovalStatus };
      const result = await this.ams_software_licensesService.updateMaster(+license_id,updateams_software_licensesDto,makerInfo,token);
      return result;
    }

    const result = await this.ams_software_licensesService.update(+license_id,updateams_software_licensesDto,token);
    return plainToInstance(ams_software_licensesEntity, result);
  }
 
  @Delete(':license_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'license_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiOkResponse({ type: ams_software_licensesEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the ams_software_licenses table',
  })
  
  async remove(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('license_id') license_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use deleteMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks,approvalStatus: mcApprovalStatus };
      const result = await this.ams_software_licensesService.deleteMaster(+license_id,makerInfo,token);
      return result;
    }

    const result = await this.ams_software_licensesService.remove(+license_id,token);
    return plainToInstance(ams_software_licensesEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: ams_software_licensesEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the ams_software_licenses table',
  })
  
  async findFirst(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.ams_software_licensesService.findFirst(token);
    return plainToInstance(ams_software_licensesEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: ams_software_licensesEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the ams_software_licenses table',
  })
  
  async findLast(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.ams_software_licensesService.findLast(token);
    return plainToInstance(ams_software_licensesEntity, result);
  }
}