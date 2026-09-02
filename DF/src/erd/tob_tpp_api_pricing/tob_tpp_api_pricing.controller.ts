
import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { tob_tpp_api_pricingService } from './tob_tpp_api_pricing.service';
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
  ApiBearerAuth
} from '@nestjs/swagger';
import { tob_tpp_api_pricingEntity } from './entity/tob_tpp_api_pricing.entity';
import { Createtob_tpp_api_pricingDto } from './dto/Createtob_tpp_api_pricing.dto';
import { Updatetob_tpp_api_pricingDto } from './dto/Updatetob_tpp_api_pricing.dto';
import { Querytob_tpp_api_pricingDto } from './dto/Querytob_tpp_api_pricing.dto';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';

 
@Controller('tob_tpp_api_pricing')
@ApiTags('ERD API')
export class tob_tpp_api_pricingController {
  constructor(
    private readonly tob_tpp_api_pricingService: tob_tpp_api_pricingService,
    private readonly ufservice: UfService
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_tpp_api_pricingEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the tob_tpp_api_pricing table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_tpp_api_pricingService.findSchema(token);
  }

  @Get('/get')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_tpp_api_pricing"})
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_tpp_api_pricingEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the tob_tpp_api_pricing table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.tob_tpp_api_pricingService.findAllmethod(query, +limit, selectColumns, token);
  }

  @Get(':id')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_tpp_api_pricing"})
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiOkResponse({ type: tob_tpp_api_pricingEntity })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_tpp_api_pricing table',
  })
  
  async findOne(@Headers() authHeader: string,@Param('id') id: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_tpp_api_pricingService.findOne(id,token);
  }
 
  @Post("/query")
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_tpp_api_pricing"})
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: Querytob_tpp_api_pricingDto })
  @ApiOkResponse({ type: tob_tpp_api_pricingEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_tpp_api_pricing table',
  })
  async findAllwithquery(@Headers() authHeader: string,@Req() req: any,@Body() body: Prisma.tob_tpp_api_pricingWhereInput) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const whereClause = body
    return this.tob_tpp_api_pricingService.findAllwithquery(token,whereClause);
  }

  @Get()
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_tpp_api_pricing"})
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_tpp_api_pricingEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_tpp_api_pricing table',
  })
  
  async findAll(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_tpp_api_pricingService.findAll(token);
  }

  @Post()
  @UsePipes(new PrismaModelValidationPipe('tob_tpp_api_pricing'))
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: Createtob_tpp_api_pricingDto })
  @ApiOkResponse({ type: tob_tpp_api_pricingEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the tob_tpp_api_pricing table',
  })
  
  async create(@Headers() authHeader: string,@Body() createtob_tpp_api_pricingDto: Prisma.tob_tpp_api_pricingCreateInput,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_tpp_api_pricingService.create(createtob_tpp_api_pricingDto,token);
  }
 
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiBody({ type: Updatetob_tpp_api_pricingDto })
  @ApiOkResponse({ type: tob_tpp_api_pricingEntity })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the tob_tpp_api_pricing table',
  })
    
  async update(@Headers() authHeader: string,@Param('id') id: string,@Body() updatetob_tpp_api_pricingDto: Prisma.tob_tpp_api_pricingUpdateInput,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_tpp_api_pricingService.update(id, updatetob_tpp_api_pricingDto,token);
  }
 
  @Delete(':id')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Delete', subject: "tob_tpp_api_pricing"})
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiOkResponse({ type: tob_tpp_api_pricingEntity })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the tob_tpp_api_pricing table',
  })
  
  async remove(@Headers() authHeader: string,@Param('id') id: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_tpp_api_pricingService.remove(id,token);
  }  
   @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: tob_tpp_api_pricingEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the tob_tpp_api_pricing table',
  })
  
  async findFirst(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.tob_tpp_api_pricingService.findFirst(token);
    return result;
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: tob_tpp_api_pricingEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the tob_tpp_api_pricing table',
  })
  
  async findLast(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.tob_tpp_api_pricingService.findLast(token);
    return result;
  }
}