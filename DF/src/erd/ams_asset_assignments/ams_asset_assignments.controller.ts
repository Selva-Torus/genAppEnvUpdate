

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { ams_asset_assignmentsService } from './ams_asset_assignments.service';
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
import { ams_asset_assignmentsEntity } from './entity/ams_asset_assignments.entity';
//import { CreateAmsAssetAssignmentsDto } from '../prisma/dto/create-amsAssetAssignments.dto';
//import { UpdateAmsAssetAssignmentsDto } from '../prisma/dto/update-amsAssetAssignments.dto';
import { Createams_asset_assignmentsDto } from './dto/Createams_asset_assignments.dto';
import { Updateams_asset_assignmentsDto } from './dto/Updateams_asset_assignments.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';

 
@Controller('ams_asset_assignments')
@ApiTags('ERD API')
export class ams_asset_assignmentsController {
  constructor(
    private readonly ams_asset_assignmentsService: ams_asset_assignmentsService,
    private readonly ufservice: UfService
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ams_asset_assignmentsEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the ams_asset_assignments table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.ams_asset_assignmentsService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ams_asset_assignmentsEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the ams_asset_assignments table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.ams_asset_assignmentsService.findAllmethod(query, +limit,selectColumns,token);
  }

  @Get(':assign_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'assign_id',type:Number})
  @ApiOkResponse({ type: ams_asset_assignmentsEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the ams_asset_assignments table',
  })
  
  async findOne(@Headers() authHeader: string,@Param('assign_id') assign_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.ams_asset_assignmentsService.findOne(+assign_id,token);
    return plainToInstance(ams_asset_assignmentsEntity, result);
  }
 
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ams_asset_assignmentsEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the ams_asset_assignments table',
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
    const result = await this.ams_asset_assignmentsService.findAll(token,);
    return plainToInstance(ams_asset_assignmentsEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('ams_asset_assignments'))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiBody({ type: Createams_asset_assignmentsDto })
  @ApiCreatedResponse({ type: ams_asset_assignmentsEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the ams_asset_assignments table',
  })
  
  async create(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createams_asset_assignmentsDto: Prisma.ams_asset_assignmentsCreateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use createMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks, approvalStatus: mcApprovalStatus,approvalId:mcApprovalID };
      const result = await this.ams_asset_assignmentsService.createMaster(createams_asset_assignmentsDto, makerInfo, token);
      return result;
    }

    const result = this.ams_asset_assignmentsService.create(createams_asset_assignmentsDto,token);
    return plainToInstance(ams_asset_assignmentsEntity, result);
  }
 
  @Patch(':assign_id')
  @UsePipes(new PrismaModelValidationPipe('ams_asset_assignments', true))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'assign_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiBody({ type: Updateams_asset_assignmentsDto })
  @ApiOkResponse({ type: ams_asset_assignmentsEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the ams_asset_assignments table',
  })
    
  async update(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('assign_id') assign_id:number,
    @Body() updateams_asset_assignmentsDto: Prisma.ams_asset_assignmentsUpdateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use updateMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks,approvalStatus: mcApprovalStatus };
      const result = await this.ams_asset_assignmentsService.updateMaster(+assign_id,updateams_asset_assignmentsDto,makerInfo,token);
      return result;
    }

    const result = await this.ams_asset_assignmentsService.update(+assign_id,updateams_asset_assignmentsDto,token);
    return plainToInstance(ams_asset_assignmentsEntity, result);
  }
 
  @Delete(':assign_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'assign_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiOkResponse({ type: ams_asset_assignmentsEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the ams_asset_assignments table',
  })
  
  async remove(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('assign_id') assign_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use deleteMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks,approvalStatus: mcApprovalStatus };
      const result = await this.ams_asset_assignmentsService.deleteMaster(+assign_id,makerInfo,token);
      return result;
    }

    const result = await this.ams_asset_assignmentsService.remove(+assign_id,token);
    return plainToInstance(ams_asset_assignmentsEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: ams_asset_assignmentsEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the ams_asset_assignments table',
  })
  
  async findFirst(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.ams_asset_assignmentsService.findFirst(token);
    return plainToInstance(ams_asset_assignmentsEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: ams_asset_assignmentsEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the ams_asset_assignments table',
  })
  
  async findLast(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.ams_asset_assignmentsService.findLast(token);
    return plainToInstance(ams_asset_assignmentsEntity, result);
  }
}