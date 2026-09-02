
import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { tob_pricing_masterService } from './tob_pricing_master.service';
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
import { tob_pricing_masterEntity } from './entity/tob_pricing_master.entity';
import { Createtob_pricing_masterDto } from './dto/Createtob_pricing_master.dto';
import { Updatetob_pricing_masterDto } from './dto/Updatetob_pricing_master.dto';
import { Querytob_pricing_masterDto } from './dto/Querytob_pricing_master.dto';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';

 
@Controller('tob_pricing_master')
@ApiTags('ERD API')
export class tob_pricing_masterController {
  constructor(
    private readonly tob_pricing_masterService: tob_pricing_masterService,
    private readonly ufservice: UfService
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_pricing_masterEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the tob_pricing_master table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_pricing_masterService.findSchema(token);
  }

  @Get('/get')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_pricing_master"})
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_pricing_masterEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the tob_pricing_master table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.tob_pricing_masterService.findAllmethod(query, +limit, selectColumns, token);
  }

  @Get(':id')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_pricing_master"})
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiOkResponse({ type: tob_pricing_masterEntity })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_pricing_master table',
  })
  
  async findOne(@Headers() authHeader: string,@Param('id') id: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_pricing_masterService.findOne(id,token);
  }
 
  @Post("/query")
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_pricing_master"})
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: Querytob_pricing_masterDto })
  @ApiOkResponse({ type: tob_pricing_masterEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_pricing_master table',
  })
  async findAllwithquery(@Headers() authHeader: string,@Req() req: any,@Body() body: Prisma.tob_pricing_masterWhereInput) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const whereClause = body
    return this.tob_pricing_masterService.findAllwithquery(token,whereClause);
  }

  @Get()
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_pricing_master"})
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_pricing_masterEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_pricing_master table',
  })
  
  async findAll(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_pricing_masterService.findAll(token);
  }

  @Post()
  @UsePipes(new PrismaModelValidationPipe('tob_pricing_master'))
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: Createtob_pricing_masterDto })
  @ApiOkResponse({ type: tob_pricing_masterEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the tob_pricing_master table',
  })
  
  async create(@Headers() authHeader: string,@Body() createtob_pricing_masterDto: Prisma.tob_pricing_masterCreateInput,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_pricing_masterService.create(createtob_pricing_masterDto,token);
  }
 
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiBody({ type: Updatetob_pricing_masterDto })
  @ApiOkResponse({ type: tob_pricing_masterEntity })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the tob_pricing_master table',
  })
    
  async update(@Headers() authHeader: string,@Param('id') id: string,@Body() updatetob_pricing_masterDto: Prisma.tob_pricing_masterUpdateInput,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_pricing_masterService.update(id, updatetob_pricing_masterDto,token);
  }
 
  @Delete(':id')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Delete', subject: "tob_pricing_master"})
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiOkResponse({ type: tob_pricing_masterEntity })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the tob_pricing_master table',
  })
  
  async remove(@Headers() authHeader: string,@Param('id') id: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_pricing_masterService.remove(id,token);
  }  
   @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: tob_pricing_masterEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the tob_pricing_master table',
  })
  
  async findFirst(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.tob_pricing_masterService.findFirst(token);
    return result;
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: tob_pricing_masterEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the tob_pricing_master table',
  })
  
  async findLast(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.tob_pricing_masterService.findLast(token);
    return result;
  }
}