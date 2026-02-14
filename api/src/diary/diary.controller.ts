import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  create(@Request() req, @Body() createDiaryEntryDto: CreateDiaryEntryDto) {
    return this.diaryService.create(createDiaryEntryDto, req.user.sub);
  }

  @Get()
  findAll(@Request() req) {
    return this.diaryService.findAll(req.user.sub);
  }

  @Get('last-three')
  getLastThreeEntries(@Request() req) {
    return this.diaryService.getLastThreeEntries(req.user.sub);
  }

  @Get('summary/weekly')
  getWeeklySummary(@Request() req) {
    return this.diaryService.getWeeklySummary(req.user.sub);
  }

  @Get('summary/monthly')
  getMonthlySummary(
    @Request() req,
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    return this.diaryService.getMonthlySummary(
      req.user.sub,
      parseInt(year),
      parseInt(month),
    );
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.diaryService.findOne(id, req.user.sub);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDiaryEntryDto: UpdateDiaryEntryDto,
  ) {
    return this.diaryService.update(id, updateDiaryEntryDto, req.user.sub);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.diaryService.remove(id, req.user.sub);
  }
}
