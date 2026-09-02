
import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { tob_revenue_summaryService } from './tob_revenue_summary.service';
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
import { tob_revenue_summaryEntity } from './entity/tob_revenue_summary.entity';
import { Createtob_revenue_summaryDto } from './dto/Createtob_revenue_summary.dto';
import { Updatetob_revenue_summaryDto } from './dto/Updatetob_revenue_summary.dto';
import { Querytob_revenue_summaryDto } from './dto/Querytob_revenue_summary.dto';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';

 
@Controller('tob_revenue_summary')
@ApiTags('ERD API')
export class tob_revenue_summaryController {
  constructor(
    private readonly tob_revenue_summaryService: tob_revenue_summaryService,
    private readonly ufservice: UfService
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_revenue_summaryEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the tob_revenue_summary table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_revenue_summaryService.findSchema(token);
  }

  @Get('/get')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_revenue_summary"})
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_revenue_summaryEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the tob_revenue_summary table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.tob_revenue_summaryService.findAllmethod(query, +limit, selectColumns, token);
  }

  @Get(':id')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_revenue_summary"})
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiOkResponse({ type: tob_revenue_summaryEntity })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_revenue_summary table',
  })
  
  async findOne(@Headers() authHeader: string,@Param('id') id: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_revenue_summaryService.findOne(id,token);
  }
 
  @Post("/query")
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_revenue_summary"})
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: Querytob_revenue_summaryDto })
  @ApiOkResponse({ type: tob_revenue_summaryEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_revenue_summary table',
  })
  async findAllwithquery(@Headers() authHeader: string,@Req() req: any,@Body() body: Prisma.tob_revenue_summaryWhereInput) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const whereClause = body
    return this.tob_revenue_summaryService.findAllwithquery(token,whereClause);
  }

  @Get()
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_revenue_summary"})
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_revenue_summaryEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_revenue_summary table',
  })
  
  async findAll(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_revenue_summaryService.findAll(token);
  }

  @Post()
  @UsePipes(new PrismaModelValidationPipe('tob_revenue_summary'))
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: Createtob_revenue_summaryDto })
  @ApiOkResponse({ type: tob_revenue_summaryEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the tob_revenue_summary table',
  })
  
  async create(@Headers() authHeader: string,@Body() createtob_revenue_summaryDto: Prisma.tob_revenue_summaryCreateInput,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_revenue_summaryService.create(createtob_revenue_summaryDto,token);
  }
 
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiBody({ type: Updatetob_revenue_summaryDto })
  @ApiOkResponse({ type: tob_revenue_summaryEntity })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the tob_revenue_summary table',
  })
    
  async update(@Headers() authHeader: string,@Param('id') id: string,@Body() updatetob_revenue_summaryDto: Prisma.tob_revenue_summaryUpdateInput,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_revenue_summaryService.update(id, updatetob_revenue_summaryDto,token);
  }
 
  @Delete(':id')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Delete', subject: "tob_revenue_summary"})
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiOkResponse({ type: tob_revenue_summaryEntity })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the tob_revenue_summary table',
  })
  
  async remove(@Headers() authHeader: string,@Param('id') id: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_revenue_summaryService.remove(id,token);
  }  
   @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: tob_revenue_summaryEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the tob_revenue_summary table',
  })
  
  async findFirst(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.tob_revenue_summaryService.findFirst(token);
    return result;
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: tob_revenue_summaryEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the tob_revenue_summary table',
  })
  
  async findLast(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.tob_revenue_summaryService.findLast(token);
    return result;
  }
}