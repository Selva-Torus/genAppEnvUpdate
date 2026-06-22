

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { ams_asset_categoriesService } from './ams_asset_categories.service';
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
import { ams_asset_categoriesEntity } from './entity/ams_asset_categories.entity';
//import { CreateAmsAssetCategoriesDto } from '../prisma/dto/create-amsAssetCategories.dto';
//import { UpdateAmsAssetCategoriesDto } from '../prisma/dto/update-amsAssetCategories.dto';
import { Createams_asset_categoriesDto } from './dto/Createams_asset_categories.dto';
import { Updateams_asset_categoriesDto } from './dto/Updateams_asset_categories.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';

 
@Controller('ams_asset_categories')
@ApiTags('ERD API')
export class ams_asset_categoriesController {
  constructor(
    private readonly ams_asset_categoriesService: ams_asset_categoriesService,
    private readonly ufservice: UfService
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ams_asset_categoriesEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the ams_asset_categories table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.ams_asset_categoriesService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ams_asset_categoriesEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the ams_asset_categories table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.ams_asset_categoriesService.findAllmethod(query, +limit,selectColumns,token);
  }

  @Get(':acat_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'acat_id',type:Number})
  @ApiOkResponse({ type: ams_asset_categoriesEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the ams_asset_categories table',
  })
  
  async findOne(@Headers() authHeader: string,@Param('acat_id') acat_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.ams_asset_categoriesService.findOne(+acat_id,token);
    return plainToInstance(ams_asset_categoriesEntity, result);
  }
 
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ams_asset_categoriesEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the ams_asset_categories table',
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
    const result = await this.ams_asset_categoriesService.findAll(token,);
    return plainToInstance(ams_asset_categoriesEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('ams_asset_categories'))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiBody({ type: Createams_asset_categoriesDto })
  @ApiCreatedResponse({ type: ams_asset_categoriesEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the ams_asset_categories table',
  })
  
  async create(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createams_asset_categoriesDto: Prisma.ams_asset_categoriesCreateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use createMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks, approvalStatus: mcApprovalStatus,approvalId:mcApprovalID };
      const result = await this.ams_asset_categoriesService.createMaster(createams_asset_categoriesDto, makerInfo, token);
      return result;
    }

    const result = this.ams_asset_categoriesService.create(createams_asset_categoriesDto,token);
    return plainToInstance(ams_asset_categoriesEntity, result);
  }
 
  @Patch(':acat_id')
  @UsePipes(new PrismaModelValidationPipe('ams_asset_categories', true))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'acat_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiBody({ type: Updateams_asset_categoriesDto })
  @ApiOkResponse({ type: ams_asset_categoriesEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the ams_asset_categories table',
  })
    
  async update(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('acat_id') acat_id:number,
    @Body() updateams_asset_categoriesDto: Prisma.ams_asset_categoriesUpdateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use updateMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks,approvalStatus: mcApprovalStatus };
      const result = await this.ams_asset_categoriesService.updateMaster(+acat_id,updateams_asset_categoriesDto,makerInfo,token);
      return result;
    }

    const result = await this.ams_asset_categoriesService.update(+acat_id,updateams_asset_categoriesDto,token);
    return plainToInstance(ams_asset_categoriesEntity, result);
  }
 
  @Delete(':acat_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'acat_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiOkResponse({ type: ams_asset_categoriesEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the ams_asset_categories table',
  })
  
  async remove(
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('acat_id') acat_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use deleteMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks,approvalStatus: mcApprovalStatus };
      const result = await this.ams_asset_categoriesService.deleteMaster(+acat_id,makerInfo,token);
      return result;
    }

    const result = await this.ams_asset_categoriesService.remove(+acat_id,token);
    return plainToInstance(ams_asset_categoriesEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: ams_asset_categoriesEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the ams_asset_categories table',
  })
  
  async findFirst(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.ams_asset_categoriesService.findFirst(token);
    return plainToInstance(ams_asset_categoriesEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: ams_asset_categoriesEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the ams_asset_categories table',
  })
  
  async findLast(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.ams_asset_categoriesService.findLast(token);
    return plainToInstance(ams_asset_categoriesEntity, result);
  }
}