import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto.js';
import { UpdateVisitDto } from './dto/update-visit.dto.js';
import { VisitsService } from './visits.service.js';

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  create(@Body() createVisitDto: CreateVisitDto) {
    return this.visitsService.create(createVisitDto);
  }

  @Get('my-visits')
  findMyVisits(
    @Query('userId') userId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('date') date?: string,
    @Query('status') status?: string,
  ) {
    return this.visitsService.findMyVisits(Number(userId), {
      page,
      limit,
      date,
      status,
    });
  }

  @Get('shelter/:shelterId')
  findShelterVisits(
    @Param('shelterId') shelterId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('date') date?: string,
    @Query('status') status?: string,
  ) {
    return this.visitsService.findShelterVisits(Number(shelterId), {
      page,
      limit,
      date,
      status,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitDto: UpdateVisitDto) {
    return this.visitsService.update(+id, updateVisitDto);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.visitsService.cancel(+id);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.visitsService.complete(+id);
  }

  @Get()
  findAll() {
    return this.visitsService.findAll();
  }
}
