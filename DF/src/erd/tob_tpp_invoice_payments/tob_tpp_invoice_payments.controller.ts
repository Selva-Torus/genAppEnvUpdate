
import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { tob_tpp_invoice_paymentsService } from './tob_tpp_invoice_payments.service';
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
import { tob_tpp_invoice_paymentsEntity } from './entity/tob_tpp_invoice_payments.entity';
import { Createtob_tpp_invoice_paymentsDto } from './dto/Createtob_tpp_invoice_payments.dto';
import { Updatetob_tpp_invoice_paymentsDto } from './dto/Updatetob_tpp_invoice_payments.dto';
import { Querytob_tpp_invoice_paymentsDto } from './dto/Querytob_tpp_invoice_payments.dto';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';

 
@Controller('tob_tpp_invoice_payments')
@ApiTags('ERD API')
export class tob_tpp_invoice_paymentsController {
  constructor(
    private readonly tob_tpp_invoice_paymentsService: tob_tpp_invoice_paymentsService,
    private readonly ufservice: UfService
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_tpp_invoice_paymentsEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the tob_tpp_invoice_payments table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_tpp_invoice_paymentsService.findSchema(token);
  }

  @Get('/get')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_tpp_invoice_payments"})
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_tpp_invoice_paymentsEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the tob_tpp_invoice_payments table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.tob_tpp_invoice_paymentsService.findAllmethod(query, +limit, selectColumns, token);
  }

  @Get(':id')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_tpp_invoice_payments"})
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiOkResponse({ type: tob_tpp_invoice_paymentsEntity })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_tpp_invoice_payments table',
  })
  
  async findOne(@Headers() authHeader: string,@Param('id') id: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_tpp_invoice_paymentsService.findOne(id,token);
  }
 
  @Post("/query")
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_tpp_invoice_payments"})
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: Querytob_tpp_invoice_paymentsDto })
  @ApiOkResponse({ type: tob_tpp_invoice_paymentsEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_tpp_invoice_payments table',
  })
  async findAllwithquery(@Headers() authHeader: string,@Req() req: any,@Body() body: Prisma.tob_tpp_invoice_paymentsWhereInput) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const whereClause = body
    return this.tob_tpp_invoice_paymentsService.findAllwithquery(token,whereClause);
  }

  @Get()
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_tpp_invoice_payments"})
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_tpp_invoice_paymentsEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_tpp_invoice_payments table',
  })
  
  async findAll(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_tpp_invoice_paymentsService.findAll(token);
  }

  @Post()
  @UsePipes(new PrismaModelValidationPipe('tob_tpp_invoice_payments'))
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: Createtob_tpp_invoice_paymentsDto })
  @ApiOkResponse({ type: tob_tpp_invoice_paymentsEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the tob_tpp_invoice_payments table',
  })
  
  async create(@Headers() authHeader: string,@Body() createtob_tpp_invoice_paymentsDto: Prisma.tob_tpp_invoice_paymentsCreateInput,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_tpp_invoice_paymentsService.create(createtob_tpp_invoice_paymentsDto,token);
  }
 
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiBody({ type: Updatetob_tpp_invoice_paymentsDto })
  @ApiOkResponse({ type: tob_tpp_invoice_paymentsEntity })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the tob_tpp_invoice_payments table',
  })
    
  async update(@Headers() authHeader: string,@Param('id') id: string,@Body() updatetob_tpp_invoice_paymentsDto: Prisma.tob_tpp_invoice_paymentsUpdateInput,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_tpp_invoice_paymentsService.update(id, updatetob_tpp_invoice_paymentsDto,token);
  }
 
  @Delete(':id')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Delete', subject: "tob_tpp_invoice_payments"})
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiOkResponse({ type: tob_tpp_invoice_paymentsEntity })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the tob_tpp_invoice_payments table',
  })
  
  async remove(@Headers() authHeader: string,@Param('id') id: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_tpp_invoice_paymentsService.remove(id,token);
  }  
   @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: tob_tpp_invoice_paymentsEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the tob_tpp_invoice_payments table',
  })
  
  async findFirst(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.tob_tpp_invoice_paymentsService.findFirst(token);
    return result;
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: tob_tpp_invoice_paymentsEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the tob_tpp_invoice_payments table',
  })
  
  async findLast(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.tob_tpp_invoice_paymentsService.findLast(token);
    return result;
  }
}