
import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { tob_consent_requestService } from './tob_consent_request.service';
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
import { tob_consent_requestEntity } from './entity/tob_consent_request.entity';
import { Createtob_consent_requestDto } from './dto/Createtob_consent_request.dto';
import { Updatetob_consent_requestDto } from './dto/Updatetob_consent_request.dto';
import { Querytob_consent_requestDto } from './dto/Querytob_consent_request.dto';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';

 
@Controller('tob_consent_request')
@ApiTags('ERD API')
export class tob_consent_requestController {
  constructor(
    private readonly tob_consent_requestService: tob_consent_requestService,
    private readonly ufservice: UfService
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_consent_requestEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the tob_consent_request table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_consent_requestService.findSchema(token);
  }

  @Get('/get')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_consent_request"})
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_consent_requestEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the tob_consent_request table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.tob_consent_requestService.findAllmethod(query, +limit, selectColumns, token);
  }

  @Get(':id')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_consent_request"})
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiOkResponse({ type: tob_consent_requestEntity })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_consent_request table',
  })
  
  async findOne(@Headers() authHeader: string,@Param('id') id: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_consent_requestService.findOne(id,token);
  }
 
  @Post("/query")
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_consent_request"})
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: Querytob_consent_requestDto })
  @ApiOkResponse({ type: tob_consent_requestEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_consent_request table',
  })
  async findAllwithquery(@Headers() authHeader: string,@Req() req: any,@Body() body: Prisma.tob_consent_requestWhereInput) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const whereClause = body
    return this.tob_consent_requestService.findAllwithquery(token,whereClause);
  }

  @Get()
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Get', subject: "tob_consent_request"})
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: tob_consent_requestEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the tob_consent_request table',
  })
  
  async findAll(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_consent_requestService.findAll(token);
  }

  @Post()
  @UsePipes(new PrismaModelValidationPipe('tob_consent_request'))
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: Createtob_consent_requestDto })
  @ApiOkResponse({ type: tob_consent_requestEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the tob_consent_request table',
  })
  
  async create(@Headers() authHeader: string,@Body() createtob_consent_requestDto: Prisma.tob_consent_requestCreateInput,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_consent_requestService.create(createtob_consent_requestDto,token);
  }
 
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiBody({ type: Updatetob_consent_requestDto })
  @ApiOkResponse({ type: tob_consent_requestEntity })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the tob_consent_request table',
  })
    
  async update(@Headers() authHeader: string,@Param('id') id: string,@Body() updatetob_consent_requestDto: Prisma.tob_consent_requestUpdateInput,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_consent_requestService.update(id, updatetob_consent_requestDto,token);
  }
 
  @Delete(':id')
  //@UseGuards(AbilitiesGuard)
  //@CheckAbilities({ action: 'Delete', subject: "tob_consent_request"})
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'id',type:String})
  @ApiOkResponse({ type: tob_consent_requestEntity })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the tob_consent_request table',
  })
  
  async remove(@Headers() authHeader: string,@Param('id') id: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.tob_consent_requestService.remove(id,token);
  }  
   @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: tob_consent_requestEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the tob_consent_request table',
  })
  
  async findFirst(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.tob_consent_requestService.findFirst(token);
    return result;
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: tob_consent_requestEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the tob_consent_request table',
  })
  
  async findLast(@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = this.tob_consent_requestService.findLast(token);
    return result;
  }
}