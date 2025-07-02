import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NegeriService } from './negeri.service';
import { CreateNegeriDto } from './dto/create-negeri.dto';
import { UpdateNegeriDto } from './dto/update-negeri.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger/dist';
import { Negeri } from './entities/negeri.entity';

@ApiTags('negeri')
@Controller('negeri')
export class NegeriController {
  constructor(private readonly negeriService: NegeriService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new state entry' })
  @ApiResponse({ status: 201, description: 'The state has been successfully created.', type: Negeri })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createNegeriDto: CreateNegeriDto) {
    return this.negeriService.create(createNegeriDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all states or search by name' })
  @ApiResponse({ status: 200, description: 'Return all states.', type: [Negeri] })
  @ApiQuery({ name: 'name', required: false, description: 'Filter by state name' })
  findAll(@Query('name') name?: string) {
    if (name) {
      return this.negeriService.findByName(name);
    }
    return this.negeriService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a state by id' })
  @ApiResponse({ status: 200, description: 'Return the state.', type: Negeri })
  @ApiResponse({ status: 404, description: 'State not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the state' })
  findOne(@Param('id') id: string) {
    return this.negeriService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a state' })
  @ApiResponse({ status: 200, description: 'The state has been successfully updated.', type: Negeri })
  @ApiResponse({ status: 404, description: 'State not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the state' })
  update(@Param('id') id: string, @Body() updateNegeriDto: UpdateNegeriDto) {
    return this.negeriService.update(+id, updateNegeriDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a state' })
  @ApiResponse({ status: 200, description: 'The state has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'State not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the state' })
  remove(@Param('id') id: string) {
    return this.negeriService.remove(+id);
  }
}
