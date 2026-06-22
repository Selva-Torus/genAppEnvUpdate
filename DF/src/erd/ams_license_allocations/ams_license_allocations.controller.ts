

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { ams_license_allocationsService } from './ams_license_allocations.service';
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
import { ams_license_allocationsEntity } from './entity/ams_license_allocations.entity';
//import { CreateAmsLicenseAllocationsDto } from '../prisma/dto/create-amsLicenseAllocations.dto';
//import { UpdateAmsLicenseAllocationsDto } from '../prisma/dto/update-amsLicenseAllocations.dto';
import { Createams_license_allocationsDto } from './dto/Createams_license_allocations.dto';
import { Updateams_license_allocationsDto } from './dto/Updateams_license_allocations.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';

 
@Controller('ams_license_allocations')
@ApiTags('ERD API')
export class ams_license_allocationsController {
  constructor(
    private readonly ams_license_allocationsService: ams_license_allocationsService,
    private readonly ufservice: UfService
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ams_license_allocationsEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the ams_license_allocations table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.ams_license_allocationsService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ams_license_allocationsEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the ams_license_allocations table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.ams_license_allocationsService.findAllmethod(query, +limit,selectColumns,token);
  }

  @Get(':alloc_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'alloc_id',type:Number})
  @ApiOkResponse({ type: ams_license_allocationsEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the ams_license_allocations table',
  })
  
  async findOne(@Headers() authHeader: string,@Param('alloc_id') alloc_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.ams_license_allocationsService.findOne(+alloc_id,token);
    return plainToInstance(ams_license_allocationsEntity, result);
  }
 
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ams_license_allocationsEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the ams_license_allocations table',
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
    const result = await this.ams_license_allocationsService.findAll(token,);
    return plainToInstance(ams_license_allocationsEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('ams_license_allocations'))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiBody({ type: Createams_license_allocationsDto })
  @ApiCreatedResponse({ type: ams_license_allocationsEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the ams_license_allocations table',
  })
  
  async create(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createams_license_allocationsDto: Prisma.ams_license_allocationsCreateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use createMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks, approvalStatus: mcApprovalStatus,approvalId:mcApprovalID };
      const result = await this.ams_license_allocationsService.createMaster(createams_license_allocationsDto, makerInfo, token);
      return result;
    }

    const result = this.ams_license_allocationsService.create(createams_license_allocationsDto,token);
    return plainToInstance(ams_license_allocationsEntity, result);
  }
 
  @Patch(':alloc_id')
  @UsePipes(new PrismaModelValidationPipe('ams_license_allocations', true))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'alloc_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiBody({ type: Updateams_license_allocationsDto })
  @ApiOkResponse({ type: ams_license_allocationsEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the ams_license_allocations table',
  })
    
  async update(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('alloc_id') alloc_id:number,
    @Body() updateams_license_allocationsDto: Prisma.ams_license_allocationsUpdateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use updateMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks,approvalStatus: mcApprovalStatus };
      const result = await this.ams_license_allocationsService.updateMaster(+alloc_id,updateams_license_allocationsDto,makerInfo,token);
      return result;
    }

    const result = await this.ams_license_allocationsService.update(+alloc_id,updateams_license_allocationsDto,token);
    return plainToInstance(ams_license_allocationsEntity, result);
  }
 
  @Delete(':alloc_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'alloc_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiOkResponse({ type: ams_license_allocationsEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the ams_license_allocations table',
  })
  
  async remove(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('alloc_id') alloc_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use deleteMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks,approvalStatus: mcApprovalStatus };
      const result = await this.ams_license_allocationsService.deleteMaster(+alloc_id,makerInfo,token);
      return result;
    }

    const result = await this.ams_license_allocationsService.remove(+alloc_id,token);
    return plainToInstance(ams_license_allocationsEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: ams_license_allocationsEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the ams_license_allocations table',
  })
  
  async findFirst(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.ams_license_allocationsService.findFirst(token);
    return plainToInstance(ams_license_allocationsEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: ams_license_allocationsEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the ams_license_allocations table',
  })
  
  async findLast(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.ams_license_allocationsService.findLast(token);
    return plainToInstance(ams_license_allocationsEntity, result);
  }
}