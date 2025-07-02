import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { KamusService } from './kamus.service';
import { CreateKamusDto } from './dto/create-kamus.dto';
import { UpdateKamusDto } from './dto/update-kamus.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger/dist';
import { Kamus } from './entities/kamus.entity';

@ApiTags('kamus')
@Controller('kamus')
export class KamusController {
  constructor(private readonly kamusService: KamusService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dictionary entry' })
  @ApiResponse({ status: 201, description: 'The entry has been successfully created.', type: Kamus })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Referenced state not found.' })
  create(@Body() createKamusDto: CreateKamusDto) {
    return this.kamusService.create(createKamusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all dictionary entries or search by dialect' })
  @ApiResponse({ status: 200, description: 'Return all dictionary entries.', type: [Kamus] })
  @ApiQuery({ name: 'dialek', required: false, description: 'Filter by dialect word' })
  findAll(@Query('dialek') dialek?: string) {
    if (dialek) {
      return this.kamusService.findByDialek(dialek);
    }
    return this.kamusService.findAll();
  }

  @Get('negeri/:negeriId')
  @ApiOperation({ summary: 'Get dictionary entries by state ID' })
  @ApiResponse({ status: 200, description: 'Return dictionary entries for the specified state.', type: [Kamus] })
  @ApiResponse({ status: 404, description: 'State not found.' })
  @ApiParam({ name: 'negeriId', description: 'The ID of the state' })
  findByNegeriId(@Param('negeriId') negeriId: string) {
    return this.kamusService.findByNegeriId(+negeriId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a dictionary entry by id' })
  @ApiResponse({ status: 200, description: 'Return the dictionary entry.', type: Kamus })
  @ApiResponse({ status: 404, description: 'Entry not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the dictionary entry' })
  findOne(@Param('id') id: string) {
    return this.kamusService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a dictionary entry' })
  @ApiResponse({ status: 200, description: 'The entry has been successfully updated.', type: Kamus })
  @ApiResponse({ status: 404, description: 'Entry or referenced state not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the dictionary entry' })
  update(@Param('id') id: string, @Body() updateKamusDto: UpdateKamusDto) {
    return this.kamusService.update(+id, updateKamusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dictionary entry' })
  @ApiResponse({ status: 200, description: 'The entry has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Entry not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the dictionary entry' })
  remove(@Param('id') id: string) {
    return this.kamusService.remove(+id);
  }
}
